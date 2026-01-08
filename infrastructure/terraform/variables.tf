# ==============================================================================
# Project Configuration
# ==============================================================================

variable "project_name" {
  description = "Name of the project (used for resource naming)"
  type        = string
  default     = "dataflow"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "UK South"
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    Project     = "DataFlow"
    Environment = "Development"
    ManagedBy   = "Terraform"
  }
}

# ==============================================================================
# GitHub Configuration
# ==============================================================================

variable "github_repo_url" {
  description = "GitHub repository URL"
  type        = string
  default     = "https://github.com/adamfoster88/Sandbox"
}

variable "github_branch" {
  description = "GitHub branch for deployment"
  type        = string
  default     = "main"
}

# ==============================================================================
# App Service Configuration
# ==============================================================================

variable "app_service_sku" {
  description = "App Service Plan SKU (B1, B2, S1, P1v2, etc.)"
  type        = string
  default     = "B1"
}

variable "python_version" {
  description = "Python version for App Service"
  type        = string
  default     = "3.11"
}

# ==============================================================================
# Existing Resources (Your SQL Server and Blob Storage)
# ==============================================================================

variable "sql_server_host" {
  description = "Existing SQL Server hostname"
  type        = string
  default     = ""
}

variable "sql_server_database" {
  description = "SQL Server database name"
  type        = string
  default     = ""
}

variable "sql_server_user" {
  description = "SQL Server username"
  type        = string
  default     = ""
  sensitive   = true
}

variable "sql_server_password" {
  description = "SQL Server password"
  type        = string
  default     = ""
  sensitive   = true
}

variable "storage_account_name" {
  description = "Existing Azure Storage Account name"
  type        = string
  default     = ""
}

variable "storage_account_key" {
  description = "Existing Azure Storage Account key"
  type        = string
  default     = ""
  sensitive   = true
}
