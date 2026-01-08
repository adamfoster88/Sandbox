# ==============================================================================
# Output Values
# ==============================================================================

# Resource Group
output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

# Frontend (Static Web App)
output "frontend_url" {
  description = "URL of the frontend Static Web App"
  value       = "https://${azurerm_static_web_app.frontend.default_host_name}"
}

output "frontend_deployment_token" {
  description = "Deployment token for Static Web App (add to GitHub secrets as AZURE_STATIC_WEB_APPS_API_TOKEN)"
  value       = azurerm_static_web_app.frontend.api_key
  sensitive   = true
}

# Backend (App Service)
output "backend_url" {
  description = "URL of the backend API"
  value       = "https://${azurerm_linux_web_app.backend.default_hostname}"
}

output "backend_api_docs_url" {
  description = "URL of the backend API documentation"
  value       = "https://${azurerm_linux_web_app.backend.default_hostname}/docs"
}

# Azure AD
output "azure_tenant_id" {
  description = "Azure AD Tenant ID"
  value       = data.azurerm_client_config.current.tenant_id
}

output "azure_client_id" {
  description = "Azure AD Application (Client) ID"
  value       = azuread_application.dataflow.client_id
}

output "azure_client_secret" {
  description = "Azure AD Application Client Secret (add to GitHub secrets)"
  value       = azuread_application_password.dataflow.value
  sensitive   = true
}

# Key Vault
output "key_vault_name" {
  description = "Name of the Key Vault"
  value       = azurerm_key_vault.main.name
}

output "key_vault_uri" {
  description = "URI of the Key Vault"
  value       = azurerm_key_vault.main.vault_uri
}

# Application Insights
output "application_insights_connection_string" {
  description = "Application Insights connection string"
  value       = azurerm_application_insights.main.connection_string
  sensitive   = true
}

output "application_insights_instrumentation_key" {
  description = "Application Insights instrumentation key"
  value       = azurerm_application_insights.main.instrumentation_key
  sensitive   = true
}

# ==============================================================================
# GitHub Secrets Summary
# ==============================================================================

output "github_secrets_summary" {
  description = "Summary of values to add to GitHub Secrets"
  value       = <<-EOT

    ============================================================
    ADD THESE TO GITHUB SECRETS
    (Repository → Settings → Secrets and variables → Actions)
    ============================================================

    AZURE_STATIC_WEB_APPS_API_TOKEN = (run: terraform output -raw frontend_deployment_token)
    AZURE_WEBAPP_PUBLISH_PROFILE    = (download from Azure Portal → App Service → Deployment Center)
    VITE_API_URL                    = https://${azurerm_linux_web_app.backend.default_hostname}

    ============================================================
    YOUR APPLICATION URLS
    ============================================================

    Frontend:  https://${azurerm_static_web_app.frontend.default_host_name}
    Backend:   https://${azurerm_linux_web_app.backend.default_hostname}
    API Docs:  https://${azurerm_linux_web_app.backend.default_hostname}/docs

  EOT
}
