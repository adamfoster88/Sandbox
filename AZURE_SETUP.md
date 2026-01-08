# Azure Deployment Setup Guide

This guide walks you through setting up Azure resources for the DataFlow platform.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         AZURE                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────┐         ┌─────────────────────┐        │
│  │ Azure Static Web    │  HTTPS  │ Azure App Service   │        │
│  │ Apps (Frontend)     │────────▶│ (Backend API)       │        │
│  │                     │         │ Python + FastAPI    │        │
│  │ dataflow.azure...   │         │ dataflow-api.azure..│        │
│  └─────────────────────┘         └──────────┬──────────┘        │
│                                             │                    │
│                            ┌────────────────┼────────────────┐   │
│                            ▼                ▼                ▼   │
│                     ┌──────────┐     ┌──────────┐    ┌─────────┐│
│                     │ SQL      │     │ Blob     │    │Azure AD ││
│                     │ Server   │     │ Storage  │    │(Auth)   ││
│                     │(existing)│     │(existing)│    │         ││
│                     └──────────┘     └──────────┘    └─────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## What You Need to Create/Provide

### 1. Azure Static Web Apps (Frontend Hosting)

**Create in Azure Portal:**
1. Go to Azure Portal → Create a resource → "Static Web App"
2. Settings:
   - Name: `dataflow-frontend` (or your choice)
   - Region: Choose closest to your users
   - SKU: Free (or Standard for custom domains)
   - Source: GitHub
   - Repository: `adamfoster88/Sandbox`
   - Branch: `main` or `claude/plan-data-platform-0NNOG`
   - Build Presets: Custom
   - App location: `/frontend`
   - Output location: `dist`

**Get this value for GitHub Secrets:**
- Go to Static Web App → Overview → Manage deployment token
- Copy the token

```
AZURE_STATIC_WEB_APPS_API_TOKEN = <your-deployment-token>
```

---

### 2. Azure App Service (Backend API Hosting)

**Create in Azure Portal:**
1. Go to Azure Portal → Create a resource → "Web App"
2. Settings:
   - Name: `dataflow-api` (this becomes dataflow-api.azurewebsites.net)
   - Publish: Code
   - Runtime stack: Python 3.11
   - Region: Same as Static Web App
   - Pricing: B1 (Basic) or higher recommended

3. After creation, configure:
   - Configuration → General settings → Startup command:
     ```
     gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
     ```

**Get this value for GitHub Secrets:**
- Go to App Service → Deployment Center → Manage publish profile
- Download the publish profile (XML file)
- Copy entire contents

```
AZURE_WEBAPP_PUBLISH_PROFILE = <entire-xml-content>
```

---

### 3. Azure AD App Registration (Authentication)

**Create in Azure Portal:**
1. Go to Azure Portal → Azure Active Directory → App registrations → New registration
2. Settings:
   - Name: `DataFlow Platform`
   - Supported account types: "Accounts in this organizational directory only"
   - Redirect URI: (add later)

3. After creation, note these values:
   - Application (client) ID
   - Directory (tenant) ID

4. Create a client secret:
   - Certificates & secrets → New client secret
   - Copy the secret value immediately (shown only once)

5. Add redirect URIs:
   - Authentication → Add platform → Single-page application
   - Add: `https://your-static-web-app.azurestaticapps.net`
   - Add: `http://localhost:5173` (for local development)

**Values needed:**
```
AZURE_TENANT_ID = <your-tenant-id>
AZURE_CLIENT_ID = <your-client-id>
AZURE_CLIENT_SECRET = <your-client-secret>
```

---

### 4. Existing Resources (You Provide)

**SQL Server:**
```
SQL_SERVER_HOST = your-server.database.windows.net
SQL_SERVER_DATABASE = your-database-name
SQL_SERVER_USER = your-username
SQL_SERVER_PASSWORD = your-password
```

**Azure Blob Storage:**
```
AZURE_STORAGE_ACCOUNT_NAME = your-storage-account
AZURE_STORAGE_ACCOUNT_KEY = your-storage-key
```

To get storage key:
- Go to Storage Account → Access keys → Show → Copy key1

---

## GitHub Secrets Configuration

Add these secrets to your GitHub repository:

1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add these secrets:

| Secret Name | Where to Get It |
|-------------|-----------------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Static Web App → Manage deployment token |
| `AZURE_WEBAPP_PUBLISH_PROFILE` | App Service → Download publish profile |
| `VITE_API_URL` | Your App Service URL (e.g., `https://dataflow-api.azurewebsites.net`) |

---

## App Service Environment Variables

Add these in Azure Portal → App Service → Configuration → Application settings:

| Name | Value |
|------|-------|
| `FRONTEND_URL` | `https://your-static-web-app.azurestaticapps.net` |
| `AZURE_TENANT_ID` | Your Azure AD tenant ID |
| `AZURE_CLIENT_ID` | Your Azure AD client ID |
| `AZURE_CLIENT_SECRET` | Your Azure AD client secret |
| `AZURE_STORAGE_ACCOUNT_NAME` | Your storage account name |
| `AZURE_STORAGE_ACCOUNT_KEY` | Your storage access key |
| `SQL_SERVER_HOST` | Your SQL Server hostname |
| `SQL_SERVER_DATABASE` | Your database name |
| `SQL_SERVER_USER` | Your SQL username |
| `SQL_SERVER_PASSWORD` | Your SQL password |

---

## Deployment Steps

### First Time Setup:

1. **Create Azure resources** (Static Web App + App Service)
2. **Add GitHub secrets** (see table above)
3. **Push to GitHub** - deployment will trigger automatically

### Subsequent Deployments:

Just push to the main branch - GitHub Actions will automatically:
1. Build the frontend
2. Deploy frontend to Static Web Apps
3. Package the backend
4. Deploy backend to App Service

---

## Quick Test (Local)

Before deploying to Azure, test locally:

**Terminal 1 - Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Backend runs at: http://localhost:8000
API docs at: http://localhost:8000/docs

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

## Estimated Costs

| Resource | SKU | Monthly Cost (USD) |
|----------|-----|-------------------|
| Static Web Apps | Free | $0 |
| App Service | B1 Basic | ~$13 |
| SQL Server | (your existing) | - |
| Blob Storage | (your existing) | - |
| **Total** | | **~$13/month** |

For production, consider:
- App Service S1 Standard (~$70/month) for auto-scaling
- Static Web Apps Standard (~$9/month) for custom domains

---

## Next Steps After Deployment

1. **Test the deployment:**
   - Frontend: `https://your-app.azurestaticapps.net`
   - Backend API: `https://your-api.azurewebsites.net/docs`
   - Health check: `https://your-api.azurewebsites.net/api/health`

2. **Add real authentication** (Phase 2)
3. **Connect to SQL Server** (Phase 3)
4. **Connect to Blob Storage** (Phase 3)

---

## Troubleshooting

**Frontend not loading:**
- Check Static Web Apps deployment logs in Azure Portal
- Verify the build output is in `frontend/dist`

**Backend returning 500 errors:**
- Check App Service logs: Monitoring → Log stream
- Verify all environment variables are set
- Check startup command is correct

**CORS errors:**
- Verify FRONTEND_URL is set correctly in App Service config
- Check the URL matches exactly (including https://)

**Authentication issues:**
- Verify redirect URIs in Azure AD match your URLs
- Check tenant ID and client ID are correct
