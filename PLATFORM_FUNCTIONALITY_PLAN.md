# DataFlow Platform - User Workspace & Collaboration Plan

## Table of Contents
1. [User Dashboard & Personal Workspace](#user-dashboard--personal-workspace)
2. [Dataset Creation & Storage Architecture](#dataset-creation--storage-architecture)
3. [Sharing & Permissions Model](#sharing--permissions-model)
4. [Real-Time Collaboration](#real-time-collaboration)
5. [Approval Workflow for Publishing](#approval-workflow-for-publishing)
6. [Technical Implementation](#technical-implementation)

---

## User Dashboard & Personal Workspace

### Overview

Each user has a personal workspace that acts as their "home" in the platform.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MY WORKSPACE                                           John Smith (Admin)  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ QUICK STATS                                                             ││
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       ││
│  │ │ 12       │ │ 8        │ │ 3        │ │ 5        │ │ 2        │       ││
│  │ │ My Files │ │ Datasets │ │ Shared   │ │ Drafts   │ │ Pending  │       ││
│  │ │          │ │          │ │ With Me  │ │          │ │ Approval │       ││
│  │ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘       ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ RECENT ACTIVITY                                                         ││
│  │ • You edited "Sales Analysis Q4" - 5 min ago                           ││
│  │ • Sarah shared "Customer Segments" with you - 1 hour ago               ││
│  │ • Your dataset "Revenue Report" was approved - 2 hours ago             ││
│  │ • Mike commented on "Product Metrics" - Yesterday                       ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  ┌────────────────────────────────┐ ┌────────────────────────────────────┐ │
│  │ MY FILES                       │ │ MY DATASETS                        │ │
│  │ [+ Upload]                     │ │ [+ Create Dataset]                 │ │
│  │ ─────────────────────────────  │ │ ─────────────────────────────────  │ │
│  │ 📄 sales_data_2025.csv   2.4MB│ │ 📊 Sales Analysis Q4      Draft   │ │
│  │ 📄 customers.xlsx        1.1MB│ │ 📊 Revenue Report      Published  │ │
│  │ 📄 products.json         340KB│ │ 📊 Customer Segments   Shared     │ │
│  │ 📄 inventory.parquet     5.2MB│ │ 📊 Product Metrics     Pending    │ │
│  │ [View All →]                   │ │ [View All →]                       │ │
│  └────────────────────────────────┘ └────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ SHARED WITH ME                                                          ││
│  │ ─────────────────────────────────────────────────────────────────────── ││
│  │ 📊 Marketing KPIs        Sarah Johnson      Can Edit      Updated 1h   ││
│  │ 📊 Financial Summary     Mike Wilson        View Only     Updated 2d   ││
│  │ 📄 raw_leads.csv         Tom Brown          Can Edit      Updated 5d   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Workspace Components

| Component | Description |
|-----------|-------------|
| **My Files** | Raw files uploaded by the user (CSV, Excel, JSON, Parquet) |
| **My Datasets** | Processed/transformed datasets created by the user |
| **Shared With Me** | Files and datasets shared by other users |
| **Drafts** | Work in progress that hasn't been saved/published |
| **Pending Approval** | Datasets submitted for review |
| **Favorites** | Starred items for quick access |

---

## Dataset Creation & Storage Architecture

### What is a "Dataset"?

A **Dataset** is a saved, versioned, queryable data asset that consists of:

```
┌─────────────────────────────────────────────────────────────────┐
│ DATASET: "Sales Analysis Q4"                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Metadata                      Data                             │
│  ┌─────────────────────┐      ┌─────────────────────────────┐  │
│  │ Name: Sales Q4      │      │                             │  │
│  │ Owner: John Smith   │      │   Stored in Azure Blob      │  │
│  │ Created: 2025-01-08 │      │   as Parquet files          │  │
│  │ Version: 3          │      │                             │  │
│  │ Status: Draft       │      │   /datasets/{id}/v3/        │  │
│  │ Size: 45MB          │      │     data.parquet            │  │
│  │ Rows: 1,234,567     │      │                             │  │
│  └─────────────────────┘      └─────────────────────────────┘  │
│                                                                 │
│  Definition (SQL/Transform)    Schema                           │
│  ┌─────────────────────┐      ┌─────────────────────────────┐  │
│  │ SELECT              │      │ date: DATE                  │  │
│  │   date,             │      │ region: STRING              │  │
│  │   region,           │      │ product: STRING             │  │
│  │   SUM(revenue)      │      │ revenue: DECIMAL(10,2)      │  │
│  │ FROM sales          │      │ quantity: INTEGER           │  │
│  │ WHERE quarter = 4   │      │                             │  │
│  │ GROUP BY 1, 2       │      │                             │  │
│  └─────────────────────┘      └─────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### How Dataset Creation Works

#### Flow: Frontend → Backend → Storage

```
┌──────────────┐      ┌──────────────┐      ┌──────────────────────────────┐
│   FRONTEND   │      │   BACKEND    │      │      AZURE STORAGE           │
│   (React)    │      │  (FastAPI)   │      │                              │
└──────┬───────┘      └──────┬───────┘      └──────────────┬───────────────┘
       │                     │                             │
       │  1. User creates    │                             │
       │     dataset in UI   │                             │
       │  ─────────────────► │                             │
       │                     │                             │
       │  {                  │                             │
       │    name: "Sales Q4" │                             │
       │    source: "query"  │                             │
       │    sql: "SELECT.."  │                             │
       │  }                  │                             │
       │                     │                             │
       │                     │  2. Execute query           │
       │                     │     against SQL Server      │
       │                     │  ───────────────────────►   │
       │                     │                             │  SQL Server
       │                     │  ◄───────────────────────   │
       │                     │     (result rows)           │
       │                     │                             │
       │                     │  3. Convert to Parquet      │
       │                     │     & upload to Blob        │
       │                     │  ───────────────────────────►
       │                     │                             │  Blob Storage
       │                     │                             │  /datasets/
       │                     │  4. Save metadata           │    {uuid}/
       │                     │     to SQL Server           │    v1/data.parquet
       │                     │  ───────────────────────►   │
       │                     │                             │
       │  5. Return dataset  │                             │
       │     info to user    │                             │
       │  ◄───────────────── │                             │
       │                     │                             │
       │  {                  │                             │
       │    id: "abc-123"    │                             │
       │    status: "ready"  │                             │
       │    rows: 50000      │                             │
       │    size: "4.5MB"    │                             │
       │  }                  │                             │
```

### Storage Architecture

```
AZURE BLOB STORAGE
├── /uploads/                          # Raw user uploads
│   └── /{user_id}/
│       ├── sales_data_2025.csv
│       ├── customers.xlsx
│       └── products.json
│
├── /datasets/                         # Processed datasets
│   └── /{dataset_id}/
│       ├── /v1/                       # Version 1
│       │   ├── data.parquet
│       │   └── metadata.json
│       ├── /v2/                       # Version 2
│       │   ├── data.parquet
│       │   └── metadata.json
│       └── /v3/                       # Current version
│           ├── data.parquet
│           └── metadata.json
│
└── /temp/                             # Temporary processing
    └── /{job_id}/
        └── processing_output.parquet


SQL SERVER (Metadata Database)
├── users                              # User accounts
├── files                              # Uploaded file metadata
├── datasets                           # Dataset definitions
├── dataset_versions                   # Version history
├── shares                             # Sharing permissions
├── comments                           # Collaboration comments
├── approvals                          # Approval workflow
└── audit_log                          # All actions
```

### Dataset Creation Methods

| Method | Description | Example |
|--------|-------------|---------|
| **From Upload** | Transform uploaded file into dataset | Upload CSV → Clean → Save as Dataset |
| **From Query** | Run SQL query, save results | `SELECT * FROM sales WHERE year=2025` |
| **From Existing** | Derive from another dataset | Filter/aggregate existing dataset |
| **From Pipeline** | Output of a data pipeline | Scheduled ETL creates dataset |
| **Manual Entry** | Create small datasets in UI | Enter data in spreadsheet-like grid |

---

## Sharing & Permissions Model

### Permission Levels

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PERMISSION LEVELS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  OWNER          Full control - can delete, transfer ownership              │
│  ────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  CAN EDIT       View, edit data, add versions, share with others           │
│  ────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  CAN COMMENT    View data, add comments, cannot modify                     │
│  ────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  VIEW ONLY      Can only view data, no modifications                       │
│  ────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  NO ACCESS      Cannot see the dataset exists                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Sharing Interface

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Share "Sales Analysis Q4"                                              [X] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Owner: John Smith                                                          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Add people or groups                                          [Add] │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │ 🔍 Search by name or email...                                   │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  People with access:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  👤 John Smith (you)                              Owner             │   │
│  │     john@company.com                                                │   │
│  │                                                                     │   │
│  │  👤 Sarah Johnson                                 [Can Edit    ▼]   │   │
│  │     sarah@company.com                             [Remove]          │   │
│  │                                                                     │   │
│  │  👤 Mike Wilson                                   [View Only  ▼]    │   │
│  │     mike@company.com                              [Remove]          │   │
│  │                                                                     │   │
│  │  👥 Data Team (group)                             [Can Comment ▼]   │   │
│  │     12 members                                    [Remove]          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Link sharing:                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ○ Restricted - Only people added above can access                   │   │
│  │ ● Anyone in organization with link - [View Only ▼]                  │   │
│  │ ○ Public - Anyone with link can view (requires approval)            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  🔗 Copy link: https://dataflow.company.com/datasets/abc-123               │
│                                                                             │
│                                                        [Cancel]  [Save]    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Share Database Schema

```sql
-- Sharing permissions table
CREATE TABLE shares (
    id              UUID PRIMARY KEY,
    resource_type   VARCHAR(50),      -- 'dataset', 'file', 'folder'
    resource_id     UUID,             -- ID of the shared resource
    shared_by       UUID,             -- User who shared
    shared_with     UUID,             -- User or Group ID
    shared_with_type VARCHAR(20),     -- 'user', 'group', 'organization'
    permission      VARCHAR(20),      -- 'view', 'comment', 'edit', 'owner'
    created_at      TIMESTAMP,
    expires_at      TIMESTAMP NULL,   -- Optional expiration

    CONSTRAINT fk_resource FOREIGN KEY (resource_id)
        REFERENCES datasets(id) ON DELETE CASCADE
);

-- Link sharing
CREATE TABLE share_links (
    id              UUID PRIMARY KEY,
    resource_type   VARCHAR(50),
    resource_id     UUID,
    created_by      UUID,
    permission      VARCHAR(20),
    link_type       VARCHAR(20),      -- 'restricted', 'organization', 'public'
    password_hash   VARCHAR(255) NULL,
    view_count      INTEGER DEFAULT 0,
    created_at      TIMESTAMP,
    expires_at      TIMESTAMP NULL
);
```

---

## Real-Time Collaboration

### Can Multiple Users Edit Simultaneously?

**Yes**, but with controlled concurrency. Here are the approaches:

### Option A: Lock-Based Editing (Simpler)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  LOCK-BASED COLLABORATION                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. User A opens dataset for editing                                        │
│     → Dataset is LOCKED to User A                                           │
│     → Others see "Being edited by User A"                                   │
│                                                                             │
│  2. User B tries to edit                                                    │
│     → Sees message: "This dataset is being edited by User A"               │
│     → Options: [View Read-Only] [Request Edit Access] [Notify When Free]   │
│                                                                             │
│  3. User A saves and closes                                                 │
│     → Lock released                                                         │
│     → User B notified if they requested                                     │
│                                                                             │
│  Timeout: If User A is idle for 30 minutes, lock auto-releases             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Option B: Real-Time Collaboration (Like Google Docs)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  REAL-TIME COLLABORATION                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Sales Analysis Q4                    👤 John  👤 Sarah  (2 viewing) │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  SELECT                                                      │   │   │
│  │  │    date,                                                     │   │   │
│  │  │    region,                    ← John is editing here         │   │   │
│  │  │    SUM(revenue) as total     │                               │   │   │
│  │  │  FROM sales                  │                               │   │   │
│  │  │  WHERE quarter = 4           │                               │   │   │
│  │  │  GROUP BY 1, 2               │← Sarah is editing here        │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Changes sync in real-time via WebSockets                          │   │
│  │  Each user sees colored cursors for others                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Technical Implementation:                                                  │
│  • WebSocket connection for real-time sync                                 │
│  • Operational Transform (OT) or CRDT for conflict resolution              │
│  • Changes saved to draft state, explicit "Save Version" to persist        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Recommended Hybrid Approach

| Area | Approach | Reason |
|------|----------|--------|
| **Query/SQL Editor** | Real-time collaboration | Text is easy to merge |
| **Data Preview** | Read-only, auto-refresh | Viewing same data is fine |
| **Transformations** | Lock-based | Complex operations need isolation |
| **Comments** | Real-time | Always allow commenting |
| **Settings/Metadata** | Lock-based | Avoid conflicts |

### Technical Implementation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  REAL-TIME ARCHITECTURE                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│    User A                    Server                      User B             │
│    (Browser)                 (FastAPI)                   (Browser)          │
│       │                         │                           │               │
│       │  WebSocket Connect      │                           │               │
│       │ ───────────────────────►│                           │               │
│       │                         │◄─────────────────────────│               │
│       │                         │  WebSocket Connect        │               │
│       │                         │                           │               │
│       │  Edit: line 3 changed   │                           │               │
│       │ ───────────────────────►│                           │               │
│       │                         │  Broadcast change         │               │
│       │                         │ ──────────────────────────►               │
│       │                         │                           │               │
│       │                         │  Edit: line 5 changed     │               │
│       │                         │◄──────────────────────────│               │
│       │  Receive change         │                           │               │
│       │◄─────────────────────── │                           │               │
│       │                         │                           │               │
│       │  Save Version           │                           │               │
│       │ ───────────────────────►│                           │               │
│       │                         │  (persist to storage)     │               │
│       │                         │  Notify: "Version saved"  │               │
│       │◄─────────────────────── │ ──────────────────────────►               │
│                                                                             │
│  Technologies:                                                              │
│  • WebSockets (FastAPI + websockets library)                               │
│  • Redis for pub/sub between server instances                              │
│  • Yjs or ShareDB for CRDT-based text collaboration                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Approval Workflow for Publishing

### Dataset Lifecycle States

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATASET LIFECYCLE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────┐     ┌─────────┐     ┌──────────┐     ┌───────────┐           │
│   │  DRAFT  │────►│ PENDING │────►│ APPROVED │────►│ PUBLISHED │           │
│   └─────────┘     │ REVIEW  │     └──────────┘     └───────────┘           │
│        │          └────┬────┘           │                 │                 │
│        │               │                │                 │                 │
│        │          ┌────▼────┐           │                 │                 │
│        │          │REJECTED │───────────┘                 │                 │
│        │          │(back to │                             │                 │
│        │          │ draft)  │                             │                 │
│        │          └─────────┘                             │                 │
│        │                                                  │                 │
│        │          ┌──────────┐                           │                 │
│        └─────────►│ ARCHIVED │◄──────────────────────────┘                 │
│                   └──────────┘                                              │
│                                                                             │
│  States:                                                                    │
│  • DRAFT      - Work in progress, only visible to owner & collaborators    │
│  • PENDING    - Submitted for review, awaiting approval                    │
│  • APPROVED   - Passed review, ready to publish                            │
│  • PUBLISHED  - Visible to all authorized users, in data catalog           │
│  • REJECTED   - Needs changes, returned to draft with feedback             │
│  • ARCHIVED   - Retired, kept for historical reference                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Approval Workflow Interface

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Submit for Approval                                                    [X] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Dataset: Sales Analysis Q4                                                 │
│  Version: 3                                                                 │
│  Owner: John Smith                                                          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Publish to:                                                         │   │
│  │ ☑ Company Data Catalog                                              │   │
│  │ ☑ Sales Team Collection                                             │   │
│  │ ☐ Public (external access)                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Approvers (at least 1 required):                                    │   │
│  │                                                                     │   │
│  │ Auto-selected based on data type:                                   │   │
│  │ ☑ Sarah Johnson (Data Steward - Sales)                             │   │
│  │                                                                     │   │
│  │ Add additional approver:                                            │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │ 🔍 Search approvers...                                          │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  │ ☑ Mike Wilson (Manager)                                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Description / Notes for Reviewers:                                  │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │ Q4 2025 sales analysis including regional breakdown and         │ │   │
│  │ │ product category performance. Data sourced from SAP and         │ │   │
│  │ │ Salesforce. Validated against finance reports.                  │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Pre-submission checklist:                                           │   │
│  │ ✓ Data quality checks passed                                        │   │
│  │ ✓ No PII detected                                                   │   │
│  │ ✓ Schema documented                                                 │   │
│  │ ⚠ No description provided (optional)                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                                              [Cancel]  [Submit for Review]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Approver's View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  APPROVAL REQUESTS                                              Sarah (3)   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📊 Sales Analysis Q4                                    [Review →]  │   │
│  │    Submitted by John Smith • 2 hours ago                            │   │
│  │    Also reviewing: Mike Wilson                                      │   │
│  │    Status: Awaiting your review                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📊 Customer Segments v2                                 [Review →]  │   │
│  │    Submitted by Tom Brown • 1 day ago                               │   │
│  │    Status: Awaiting your review                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  Review: Sales Analysis Q4                                              [X] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐  ┌────────────────────────────────────────────┐   │
│  │ Dataset Info        │  │ Data Preview                               │   │
│  │ ─────────────────── │  │ ──────────────────────────────────────     │   │
│  │ Owner: John Smith   │  │ date       region    product    revenue    │   │
│  │ Version: 3          │  │ 2025-10-01 North     Widget A   $12,450    │   │
│  │ Rows: 50,234        │  │ 2025-10-01 South     Widget B   $8,320     │   │
│  │ Columns: 12         │  │ 2025-10-02 North     Widget A   $11,200    │   │
│  │ Size: 4.5 MB        │  │ ...                                        │   │
│  │                     │  │                                            │   │
│  │ Quality Score: 94%  │  │ [View Full Data] [View Query] [View Schema]│   │
│  └─────────────────────┘  └────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Automated Checks                                                    │   │
│  │ ✓ No null values in key columns                                     │   │
│  │ ✓ Date range valid (Oct 1 - Dec 31, 2025)                          │   │
│  │ ✓ No PII detected                                                   │   │
│  │ ✓ Revenue values within expected range                              │   │
│  │ ⚠ 3 duplicate rows found (0.006%)                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Your Review:                                                        │   │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │ │ Add comments or feedback...                                     │ │   │
│  │ │                                                                 │ │   │
│  │ └─────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ○ Approve - Dataset meets standards                                 │   │
│  │ ○ Approve with comments - Meets standards, minor feedback           │   │
│  │ ○ Request changes - Send back to author for modifications          │   │
│  │ ○ Reject - Does not meet standards                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                                                   [Cancel]  [Submit Review] │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Approval Configuration (Admin)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Approval Workflow Settings                                     (Admin)     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Global Settings                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ☑ Require approval before publishing                                │   │
│  │ ☑ Auto-assign approvers based on data domain                        │   │
│  │ ☐ Require multiple approvers (at least 2)                           │   │
│  │ ☑ Run automated quality checks before review                        │   │
│  │ ☑ Block publishing if PII detected                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Approvers by Domain                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Domain              Primary Approver      Backup Approver           │   │
│  │ ───────────────────────────────────────────────────────────────     │   │
│  │ Sales               Sarah Johnson         Mike Wilson               │   │
│  │ Finance             David Lee             Emma Chen                 │   │
│  │ Marketing           Tom Brown             Lisa Park                 │   │
│  │ Operations          John Smith            [+ Add]                   │   │
│  │ [+ Add Domain]                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Auto-approval Rules                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ☐ Auto-approve minor version updates (same schema)                  │   │
│  │ ☐ Auto-approve if quality score > 95%                               │   │
│  │ ☑ Auto-approve for Super Admins                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation

### Database Schema for Collaboration Features

```sql
-- Datasets table
CREATE TABLE datasets (
    id                  UUID PRIMARY KEY,
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    owner_id            UUID REFERENCES users(id),
    status              VARCHAR(20) DEFAULT 'draft',
    -- draft, pending_review, approved, published, rejected, archived
    visibility          VARCHAR(20) DEFAULT 'private',
    -- private, team, organization, public
    current_version     INTEGER DEFAULT 1,
    storage_path        VARCHAR(500),
    row_count           BIGINT,
    size_bytes          BIGINT,
    schema_json         JSONB,
    query_definition    TEXT,
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW(),
    published_at        TIMESTAMP
);

-- Version history
CREATE TABLE dataset_versions (
    id                  UUID PRIMARY KEY,
    dataset_id          UUID REFERENCES datasets(id),
    version             INTEGER,
    storage_path        VARCHAR(500),
    row_count           BIGINT,
    size_bytes          BIGINT,
    schema_json         JSONB,
    query_definition    TEXT,
    created_by          UUID REFERENCES users(id),
    created_at          TIMESTAMP DEFAULT NOW(),
    change_summary      TEXT
);

-- Collaboration - real-time presence
CREATE TABLE dataset_sessions (
    id                  UUID PRIMARY KEY,
    dataset_id          UUID REFERENCES datasets(id),
    user_id             UUID REFERENCES users(id),
    session_type        VARCHAR(20), -- 'viewing', 'editing'
    started_at          TIMESTAMP DEFAULT NOW(),
    last_active         TIMESTAMP DEFAULT NOW(),
    cursor_position     JSONB -- for real-time cursor tracking
);

-- Comments and discussions
CREATE TABLE comments (
    id                  UUID PRIMARY KEY,
    resource_type       VARCHAR(50),
    resource_id         UUID,
    parent_id           UUID REFERENCES comments(id), -- for threads
    user_id             UUID REFERENCES users(id),
    content             TEXT,
    line_reference      INTEGER, -- for inline comments on queries
    resolved            BOOLEAN DEFAULT FALSE,
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW()
);

-- Approval workflow
CREATE TABLE approval_requests (
    id                  UUID PRIMARY KEY,
    dataset_id          UUID REFERENCES datasets(id),
    dataset_version     INTEGER,
    requested_by        UUID REFERENCES users(id),
    status              VARCHAR(20) DEFAULT 'pending',
    -- pending, approved, rejected, cancelled
    publish_targets     JSONB, -- ['catalog', 'team_sales', 'public']
    notes               TEXT,
    created_at          TIMESTAMP DEFAULT NOW(),
    completed_at        TIMESTAMP
);

CREATE TABLE approval_reviews (
    id                  UUID PRIMARY KEY,
    request_id          UUID REFERENCES approval_requests(id),
    reviewer_id         UUID REFERENCES users(id),
    decision            VARCHAR(20), -- 'approved', 'rejected', 'changes_requested'
    comments            TEXT,
    reviewed_at         TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id                  UUID PRIMARY KEY,
    user_id             UUID REFERENCES users(id),
    type                VARCHAR(50),
    title               VARCHAR(255),
    message             TEXT,
    resource_type       VARCHAR(50),
    resource_id         UUID,
    read                BOOLEAN DEFAULT FALSE,
    created_at          TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints for Collaboration

```python
# FastAPI endpoints (to be implemented)

# Sharing
POST   /api/datasets/{id}/share           # Share with users/groups
DELETE /api/datasets/{id}/share/{user_id} # Remove share
GET    /api/datasets/{id}/collaborators   # List collaborators
POST   /api/datasets/{id}/share-link      # Create shareable link

# Collaboration
GET    /api/datasets/{id}/sessions        # Who's viewing/editing
POST   /api/datasets/{id}/lock            # Request edit lock
DELETE /api/datasets/{id}/lock            # Release lock
WS     /ws/datasets/{id}/collaborate      # WebSocket for real-time

# Comments
GET    /api/datasets/{id}/comments        # List comments
POST   /api/datasets/{id}/comments        # Add comment
PUT    /api/comments/{id}                 # Edit comment
DELETE /api/comments/{id}                 # Delete comment
POST   /api/comments/{id}/resolve         # Mark resolved

# Approval workflow
POST   /api/datasets/{id}/submit-review   # Submit for approval
GET    /api/approval-requests             # List pending requests
GET    /api/approval-requests/{id}        # Get request details
POST   /api/approval-requests/{id}/review # Submit review decision
POST   /api/approval-requests/{id}/cancel # Cancel request
```

---

## Summary: Recommended Implementation Order

| Phase | Feature | Complexity | Priority |
|-------|---------|------------|----------|
| 1 | User workspace & file uploads | Medium | High |
| 2 | Dataset creation from query | Medium | High |
| 3 | Basic sharing (view/edit) | Low | High |
| 4 | Version history | Low | Medium |
| 5 | Comments | Low | Medium |
| 6 | Approval workflow | Medium | Medium |
| 7 | Lock-based editing | Low | Medium |
| 8 | Real-time collaboration | High | Lower |
| 9 | Public sharing & catalogs | Medium | Lower |

---

## Questions for You

1. **Collaboration style**: Do you prefer lock-based editing (simpler) or real-time Google Docs-style (more complex)?

2. **Approval process**: Should approval be mandatory for all published datasets, or only certain types?

3. **Sharing scope**: Should users be able to share with:
   - Individual users only?
   - Groups/teams?
   - Entire organization?
   - External users (public links)?

4. **Data governance**: Should there be automatic PII detection that blocks publishing sensitive data?
