# DataFlow Platform - Terraform Infrastructure

This Terraform configuration creates all Azure resources needed for the DataFlow platform.

## Resources Created

| Resource | Name | Purpose |
|----------|------|---------|
| Resource Group | `rg-dataflow-dev` | Container for all resources |
| Static Web App | `swa-dataflow-dev` | Frontend hosting |
| App Service Plan | `asp-dataflow-dev` | Backend compute plan |
| App Service | `app-dataflow-api-dev` | Backend API hosting |
| Azure AD App | `dataflow-dev` | Authentication |
| Key Vault | `kv-dataflow-dev` | Secret storage |
| Application Insights | `appi-dataflow-dev` | Monitoring |
| Log Analytics | `log-dataflow-dev` | Logging |

## Prerequisites

1. **Terraform CLI** (v1.5.0+)
   - Download: https://terraform.io/downloads

2. **Azure CLI** (logged in)
   ```bash
   az login
   az account set --subscription "Your Subscription Name"
   ```

3. **Permissions Required**
   - Contributor role on the subscription (or a specific resource group)
   - Application Administrator role in Azure AD (for app registration)

## Quick Start

### 1. Clone and navigate to terraform directory

```bash
cd infrastructure/terraform
```

### 2. Create your variables file

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your values:
- Your SQL Server connection details
- Your Azure Storage account details
- Desired region and naming

### 3. Initialize Terraform

```bash
terraform init
```

### 4. Preview the changes

```bash
terraform plan
```

### 5. Apply the configuration

```bash
terraform apply
```

Type `yes` when prompted.

### 6. Get the outputs

```bash
# See all outputs
terraform output

# Get specific sensitive values
terraform output -raw frontend_deployment_token
terraform output -raw azure_client_secret
```

## After Terraform Apply

### Add GitHub Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | How to Get |
|-------------|-----------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | `terraform output -raw frontend_deployment_token` |
| `AZURE_WEBAPP_PUBLISH_PROFILE` | Azure Portal → App Service → Deployment Center → Manage publish profile |
| `VITE_API_URL` | `terraform output backend_url` |

### Deploy Your Code

Push to GitHub to trigger deployment:

```bash
git push origin main
```

Or manually trigger the workflow in GitHub Actions.

## Useful Commands

```bash
# See current state
terraform show

# See specific output
terraform output frontend_url
terraform output backend_url

# Destroy all resources (be careful!)
terraform destroy

# Format terraform files
terraform fmt

# Validate configuration
terraform validate
```

## Cost Estimate

| Resource | SKU | Monthly Cost (USD) |
|----------|-----|-------------------|
| Static Web App | Free | $0 |
| App Service Plan | B1 | ~$13 |
| Key Vault | Standard | ~$0.03/10k ops |
| Application Insights | Pay-as-you-go | ~$2-5 |
| Log Analytics | Pay-as-you-go | ~$2-5 |
| **Total** | | **~$15-25/month** |

## Customization

### Change Region

Edit `terraform.tfvars`:
```hcl
location = "West Europe"  # or "East US", "UK South", etc.
```

### Upgrade App Service

Edit `terraform.tfvars`:
```hcl
app_service_sku = "S1"  # Standard tier with auto-scaling
```

### Production Environment

Create a separate tfvars file:
```bash
cp terraform.tfvars terraform.prod.tfvars
# Edit with production values

terraform apply -var-file="terraform.prod.tfvars"
```

## Troubleshooting

### "Authorization failed"
- Ensure you're logged in: `az login`
- Check you have Contributor role on the subscription

### "Application registration failed"
- You need Application Administrator role in Azure AD
- Or ask your Azure AD admin to create the app registration manually

### "Name already taken"
- Resource names must be globally unique
- Change `project_name` or `environment` in tfvars

## Clean Up

To destroy all resources:

```bash
terraform destroy
```

**Warning**: This will delete everything! Make sure you have backups if needed.
