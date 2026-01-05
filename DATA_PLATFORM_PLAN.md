# Data Platform Development Plan

## Overview

A modern data platform integrated with Azure, featuring data pipelines, SQL Server connectivity, Azure Blob Storage, and a cutting-edge frontend interface.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AZURE CLOUD                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────────────┐   │
│  │  Azure AD    │    │ Azure App    │    │      Azure Blob Storage      │   │
│  │ (Auth/SSO)   │    │   Service    │    │   (Data Lake / File Store)   │   │
│  └──────┬───────┘    └──────┬───────┘    └──────────────┬───────────────┘   │
│         │                   │                           │                    │
│         │            ┌──────┴───────┐                   │                    │
│         │            │   Backend    │                   │                    │
│         └───────────►│   (API)      │◄──────────────────┘                    │
│                      │  Python/     │                                        │
│                      │  FastAPI     │                                        │
│                      └──────┬───────┘                                        │
│                             │                                                │
│                      ┌──────┴───────┐                                        │
│                      │  SQL Server  │                                        │
│                      │  (Existing)  │                                        │
│                      └──────────────┘                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            FRONTEND (SPA)                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  React + TypeScript + Vite + TailwindCSS + Shadcn/UI                        │
│  - Admin Dashboard                                                           │
│  - Data Pipeline Management                                                  │
│  - Data Explorer / Visualization                                             │
│  - User Management                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | React 18 + TypeScript + Vite | Fast dev experience, type safety |
| **UI Framework** | Shadcn/UI + TailwindCSS | Modern, accessible, customizable |
| **State Management** | TanStack Query + Zustand | Server state + client state |
| **Backend API** | Python + FastAPI | Async, fast, great for data work |
| **Data Pipeline** | Apache Airflow / Azure Data Factory | Orchestration & scheduling |
| **Database** | SQL Server (existing) | Your existing infrastructure |
| **File Storage** | Azure Blob Storage | Scalable object storage |
| **Authentication** | Azure AD (Entra ID) + MSAL | Enterprise SSO, existing Azure estate |
| **Deployment** | Azure App Service / Container Apps | PaaS simplicity or container flexibility |

---

## Development Phases

### Phase 1: Foundation & Authentication (Week 1-2)
**Goal:** Establish project structure and secure authentication

#### What Claude Code Will Build:
1. **Project Scaffolding**
   - Initialize monorepo structure (`/frontend`, `/backend`, `/infrastructure`)
   - Set up package.json, pyproject.toml, configuration files
   - Configure ESLint, Prettier, Black, pytest

2. **Authentication System**
   - Azure AD app registration configuration guide
   - Backend: FastAPI with MSAL authentication middleware
   - Frontend: MSAL React integration with protected routes
   - Role-based access control (RBAC) foundation

#### How You Test:
```bash
# Terminal 1: Start backend
cd backend && uvicorn main:app --reload --port 8000

# Terminal 2: Start frontend
cd frontend && npm run dev
# Opens at http://localhost:5173

# Test login flow with your Azure AD credentials
```

---

### Phase 2: Admin Interface (Week 3-4)
**Goal:** Build the administrative backbone

#### What Claude Code Will Build:
1. **Admin Dashboard Layout**
   - Responsive sidebar navigation
   - Header with user profile & notifications
   - Dashboard home with system metrics

2. **User Management**
   - User list with search/filter/pagination
   - User detail view & role assignment
   - Invite user functionality

3. **System Configuration**
   - Connection management (SQL Server, Blob Storage)
   - Environment configuration UI
   - Audit logging viewer

#### How You Test:
```bash
# Same local dev servers as Phase 1
# Navigate to http://localhost:5173/admin

# Mock data provided for development
# Storybook available for component testing:
cd frontend && npm run storybook
# Opens at http://localhost:6006
```

---

### Phase 3: Data Connectivity Layer (Week 5-6)
**Goal:** Connect to SQL Server and Azure Blob Storage

#### What Claude Code Will Build:
1. **SQL Server Integration**
   - SQLAlchemy async connection pooling
   - Query builder & execution engine
   - Schema introspection API
   - Secure credential management (Azure Key Vault)

2. **Azure Blob Storage Integration**
   - Blob listing, upload, download APIs
   - Container management
   - SAS token generation for secure access
   - File preview capabilities (CSV, JSON, Parquet)

3. **Data Source Management UI**
   - Connection wizard (SQL Server & Blob)
   - Test connection functionality
   - Saved connections list

#### How You Test:
```bash
# Backend integration tests
cd backend && pytest tests/integration -v

# Use Azure Storage Emulator (Azurite) locally:
docker run -p 10000:10000 -p 10001:10001 -p 10002:10002 \
  mcr.microsoft.com/azure-storage/azurite

# SQL Server in Docker for local dev:
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong!Passw0rd" \
  -p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest
```

---

### Phase 4: Data Pipeline Engine (Week 7-9)
**Goal:** Build the ETL/data pipeline functionality

#### What Claude Code Will Build:
1. **Pipeline Designer**
   - Visual drag-and-drop pipeline builder (React Flow)
   - Node types: Source, Transform, Destination
   - Pipeline validation & preview

2. **Pipeline Execution Engine**
   - Async task execution with Celery/ARQ
   - Pipeline run history & logs
   - Scheduling (cron-based)
   - Error handling & retry logic

3. **Transform Library**
   - Common transforms (filter, map, aggregate, join)
   - SQL transform node
   - Python script node (sandboxed)
   - Data quality checks

#### How You Test:
```bash
# Redis for task queue (local):
docker run -p 6379:6379 redis:alpine

# Run pipeline worker:
cd backend && arq worker.WorkerSettings

# Frontend pipeline designer:
# http://localhost:5173/pipelines/new
# Drag components, connect, run test pipeline
```

---

### Phase 5: Data Explorer & Visualization (Week 10-11)
**Goal:** Enable data discovery and basic visualization

#### What Claude Code Will Build:
1. **Data Explorer**
   - Browse SQL tables and Blob containers
   - Query editor with syntax highlighting
   - Results grid with export options
   - Query history & saved queries

2. **Visualization Components**
   - Chart library integration (Recharts/Apache ECharts)
   - Dashboard builder (drag-and-drop widgets)
   - Basic chart types: line, bar, pie, table

#### How You Test:
```bash
# Same local setup
# Navigate to http://localhost:5173/explorer
# Write queries against local SQL Server
# Create charts from query results
```

---

### Phase 6: Deployment & Production Readiness (Week 12)
**Goal:** Deploy to Azure and production harden

#### What Claude Code Will Build:
1. **Infrastructure as Code**
   - Terraform/Bicep templates for Azure resources
   - Azure App Service configuration
   - Azure Container Registry setup
   - Networking & security groups

2. **CI/CD Pipeline**
   - GitHub Actions workflows
   - Build, test, deploy stages
   - Environment promotion (dev → staging → prod)

3. **Monitoring & Observability**
   - Application Insights integration
   - Structured logging
   - Health check endpoints
   - Error alerting

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Repository                             │
│  └── .github/workflows/                                          │
│       ├── ci.yml (test on PR)                                   │
│       ├── deploy-dev.yml (auto-deploy to dev)                   │
│       └── deploy-prod.yml (manual approval)                     │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Azure Resources                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐     ┌─────────────────┐                    │
│  │ Resource Group  │     │ Resource Group  │                    │
│  │ (Development)   │     │ (Production)    │                    │
│  └────────┬────────┘     └────────┬────────┘                    │
│           │                       │                              │
│  ┌────────┴────────────────────────┴────────┐                   │
│  │                                           │                   │
│  │  • App Service (Backend API)             │                   │
│  │  • Static Web App (Frontend)             │                   │
│  │  • Key Vault (Secrets)                   │                   │
│  │  • Application Insights (Monitoring)     │                   │
│  │  • Container Registry (if using containers)                  │
│  │                                           │                   │
│  └───────────────────────────────────────────┘                   │
│                                                                  │
│  ┌───────────────────────────────────────────┐                   │
│  │  Shared Resources                         │                   │
│  │  • Azure AD (Entra ID) - Authentication  │                   │
│  │  • SQL Server (Your existing)            │                   │
│  │  • Blob Storage (Your existing)          │                   │
│  └───────────────────────────────────────────┘                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐     ┌─────────┐
│  User    │     │   Frontend   │     │   Azure AD   │     │ Backend │
└────┬─────┘     └──────┬───────┘     └──────┬───────┘     └────┬────┘
     │                  │                    │                  │
     │  1. Click Login  │                    │                  │
     │─────────────────>│                    │                  │
     │                  │                    │                  │
     │                  │ 2. Redirect to     │                  │
     │                  │    Azure AD        │                  │
     │                  │───────────────────>│                  │
     │                  │                    │                  │
     │  3. Enter credentials                 │                  │
     │<──────────────────────────────────────│                  │
     │──────────────────────────────────────>│                  │
     │                  │                    │                  │
     │                  │ 4. Return tokens   │                  │
     │                  │<───────────────────│                  │
     │                  │    (ID + Access)   │                  │
     │                  │                    │                  │
     │                  │ 5. API call with   │                  │
     │                  │    Bearer token    │                  │
     │                  │───────────────────────────────────────>│
     │                  │                    │                  │
     │                  │                    │  6. Validate     │
     │                  │                    │<─────────────────│
     │                  │                    │─────────────────>│
     │                  │                    │                  │
     │                  │ 7. Return data     │                  │
     │                  │<───────────────────────────────────────│
     │                  │                    │                  │
     │  8. Show data    │                    │                  │
     │<─────────────────│                    │                  │
     │                  │                    │                  │
```

### Authentication Setup Required:
1. **Azure AD App Registration** (you do this in Azure Portal)
   - Register application for backend (API)
   - Register application for frontend (SPA)
   - Configure redirect URIs
   - Define API scopes

2. **Claude Code Implements:**
   - MSAL.js configuration in frontend
   - FastAPI MSAL middleware for token validation
   - Role extraction from JWT claims
   - Protected route guards

---

## Local Development Setup

### Prerequisites You'll Need:
- Node.js 20+
- Python 3.11+
- Docker Desktop
- Azure CLI (`az`)
- Git

### How Claude Code Sets It Up:

```bash
# 1. Clone and install
git clone <your-repo>
cd data-platform

# 2. Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -e ".[dev]"
cp .env.example .env      # Configure your connections

# 3. Frontend setup
cd ../frontend
npm install
cp .env.example .env.local  # Configure Azure AD app IDs

# 4. Start local services (SQL, Redis, Azurite)
docker-compose up -d

# 5. Run migrations
cd ../backend
alembic upgrade head

# 6. Start development servers
# Terminal 1:
cd backend && uvicorn main:app --reload

# Terminal 2:
cd frontend && npm run dev
```

---

## Testing Strategy

| Layer | Tool | What It Tests |
|-------|------|---------------|
| **Unit (Backend)** | pytest | Business logic, utilities |
| **Unit (Frontend)** | Vitest + React Testing Library | Components, hooks |
| **Integration** | pytest + testcontainers | Database, Blob Storage |
| **E2E** | Playwright | Full user flows |
| **Visual** | Storybook + Chromatic | UI components in isolation |
| **API** | pytest + httpx | Endpoint contracts |

### Running Tests:
```bash
# Backend
cd backend
pytest                    # All tests
pytest tests/unit         # Unit only
pytest tests/integration  # Integration (needs Docker)

# Frontend
cd frontend
npm run test              # Unit tests (Vitest)
npm run test:e2e          # E2E tests (Playwright)
npm run storybook         # Visual component testing
```

---

## Project Structure

```
data-platform/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-dev.yml
│       └── deploy-prod.yml
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature modules
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── pipelines/
│   │   │   └── explorer/
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities & config
│   │   ├── services/         # API clients
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/              # FastAPI routes
│   │   ├── core/             # Config, security, deps
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   └── main.py
│   ├── tests/
│   ├── alembic/              # DB migrations
│   └── pyproject.toml
│
├── infrastructure/
│   ├── terraform/            # or bicep/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── environments/
│   └── docker-compose.yml    # Local dev services
│
└── README.md
```

---

## How Claude Code Works With You

### Iterative Development Loop:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. You request a feature                                  │
│      "Build the user management page"                       │
│                          │                                  │
│                          ▼                                  │
│   2. Claude Code implements                                 │
│      - Creates/edits files                                  │
│      - Runs tests                                           │
│      - Commits changes                                      │
│                          │                                  │
│                          ▼                                  │
│   3. You test locally                                       │
│      - Frontend: http://localhost:5173                      │
│      - Check functionality                                  │
│      - Report issues or request changes                     │
│                          │                                  │
│                          ▼                                  │
│   4. Iterate until satisfied                                │
│      - Refinements                                          │
│      - Bug fixes                                            │
│      - Enhancements                                         │
│                          │                                  │
│                          ▼                                  │
│   5. Claude Code pushes to branch                           │
│      - GitHub Actions runs CI                               │
│      - Auto-deploy to dev environment                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Next Steps

To begin implementation, I recommend we:

1. **Start with Phase 1** - Set up project structure and authentication
2. **You provide:**
   - Azure subscription details (or I'll use placeholders)
   - Azure AD tenant ID
   - Existing SQL Server connection details
   - Existing Blob Storage account name

Would you like me to begin building Phase 1 (Foundation & Authentication)?
