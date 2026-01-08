# ==============================================================================
# Data Sources
# ==============================================================================

data "azurerm_client_config" "current" {}

data "azuread_client_config" "current" {}

# ==============================================================================
# Resource Group
# ==============================================================================

resource "azurerm_resource_group" "main" {
  name     = "rg-${var.project_name}-${var.environment}"
  location = var.location
  tags     = var.tags
}

# ==============================================================================
# Azure AD App Registration (for Authentication)
# ==============================================================================

resource "azuread_application" "dataflow" {
  display_name = "${var.project_name}-${var.environment}"
  owners       = [data.azuread_client_config.current.object_id]

  # Single Page Application configuration
  single_page_application {
    redirect_uris = [
      "http://localhost:5173/",
      "https://${azurerm_static_web_app.frontend.default_host_name}/",
    ]
  }

  # API permissions
  required_resource_access {
    resource_app_id = "00000003-0000-0000-c000-000000000000" # Microsoft Graph

    resource_access {
      id   = "e1fe6dd8-ba31-4d61-89e7-88639da4683d" # User.Read
      type = "Scope"
    }
  }

  tags = ["DataFlow", var.environment]
}

resource "azuread_application_password" "dataflow" {
  application_id = azuread_application.dataflow.id
  display_name   = "terraform-generated"
  end_date       = timeadd(timestamp(), "8760h") # 1 year
}

resource "azuread_service_principal" "dataflow" {
  client_id                    = azuread_application.dataflow.client_id
  app_role_assignment_required = false
  owners                       = [data.azuread_client_config.current.object_id]
}

# ==============================================================================
# Azure Static Web App (Frontend)
# ==============================================================================

resource "azurerm_static_web_app" "frontend" {
  name                = "swa-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  sku_tier            = "Free"
  sku_size            = "Free"

  tags = var.tags
}

# ==============================================================================
# App Service Plan (Backend)
# ==============================================================================

resource "azurerm_service_plan" "main" {
  name                = "asp-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku

  tags = var.tags
}

# ==============================================================================
# App Service (Backend API)
# ==============================================================================

resource "azurerm_linux_web_app" "backend" {
  name                = "app-${var.project_name}-api-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.main.location
  service_plan_id     = azurerm_service_plan.main.id

  https_only = true

  site_config {
    always_on = var.app_service_sku != "F1" && var.app_service_sku != "B1" ? true : false

    application_stack {
      python_version = var.python_version
    }

    # Startup command for FastAPI
    app_command_line = "gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000"

    cors {
      allowed_origins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://${azurerm_static_web_app.frontend.default_host_name}",
      ]
      support_credentials = true
    }
  }

  app_settings = {
    # App Configuration
    "SCM_DO_BUILD_DURING_DEPLOYMENT" = "true"
    "ENABLE_ORYX_BUILD"              = "true"

    # Frontend URL for CORS
    "FRONTEND_URL" = "https://${azurerm_static_web_app.frontend.default_host_name}"

    # Azure AD Authentication
    "AZURE_TENANT_ID"     = data.azurerm_client_config.current.tenant_id
    "AZURE_CLIENT_ID"     = azuread_application.dataflow.client_id
    "AZURE_CLIENT_SECRET" = azuread_application_password.dataflow.value

    # Azure Storage (your existing)
    "AZURE_STORAGE_ACCOUNT_NAME" = var.storage_account_name
    "AZURE_STORAGE_ACCOUNT_KEY"  = var.storage_account_key

    # SQL Server (your existing)
    "SQL_SERVER_HOST"     = var.sql_server_host
    "SQL_SERVER_DATABASE" = var.sql_server_database
    "SQL_SERVER_USER"     = var.sql_server_user
    "SQL_SERVER_PASSWORD" = var.sql_server_password
  }

  tags = var.tags

  lifecycle {
    ignore_changes = [
      app_settings["AZURE_CLIENT_SECRET"], # Don't update secret on every apply
    ]
  }
}

# ==============================================================================
# Key Vault (for secure secret storage - optional but recommended)
# ==============================================================================

resource "azurerm_key_vault" "main" {
  name                       = "kv-${var.project_name}-${var.environment}"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7
  purge_protection_enabled   = false

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get", "List", "Set", "Delete", "Purge"
    ]
  }

  # Allow App Service to read secrets
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = azurerm_linux_web_app.backend.identity[0].principal_id

    secret_permissions = [
      "Get", "List"
    ]
  }

  tags = var.tags

  depends_on = [azurerm_linux_web_app.backend]
}

# Enable System Managed Identity on App Service
resource "azurerm_linux_web_app" "backend_identity" {
  name                = azurerm_linux_web_app.backend.name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.main.location
  service_plan_id     = azurerm_service_plan.main.id

  identity {
    type = "SystemAssigned"
  }

  site_config {
    application_stack {
      python_version = var.python_version
    }
  }

  lifecycle {
    ignore_changes = all
  }
}

# ==============================================================================
# Application Insights (Monitoring)
# ==============================================================================

resource "azurerm_log_analytics_workspace" "main" {
  name                = "log-${var.project_name}-${var.environment}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = var.tags
}

resource "azurerm_application_insights" "main" {
  name                = "appi-${var.project_name}-${var.environment}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  workspace_id        = azurerm_log_analytics_workspace.main.id
  application_type    = "web"

  tags = var.tags
}
