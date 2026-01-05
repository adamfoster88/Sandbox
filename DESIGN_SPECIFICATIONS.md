# Data Platform - Design Specifications

## Table of Contents
1. [Development Order](#development-order)
2. [Screen Mockups](#screen-mockups)
3. [Permission Layers](#permission-layers)
4. [Admin Monitoring Capabilities](#admin-monitoring-capabilities)
5. [Design System & Theme](#design-system--theme)

---

## Development Order

### Complete Development Roadmap

| Order | Area | Components | Priority | Dependencies |
|-------|------|------------|----------|--------------|
| 1 | **Authentication & Security** | Login, SSO, MFA, Session Management | Critical | Azure AD Setup |
| 2 | **Core Layout & Navigation** | Sidebar, Header, Routing, Breadcrumbs | Critical | Auth Complete |
| 3 | **User Profile** | Profile View, Edit Profile, Preferences, Avatar | High | Auth Complete |
| 4 | **Admin Dashboard** | Overview Cards, System Health, Quick Actions | High | Layout Complete |
| 5 | **User Management** | User List, Create/Edit/Delete, Role Assignment | High | Admin Dashboard |
| 6 | **Role & Permission Management** | Role Editor, Permission Matrix, Access Control | High | User Management |
| 7 | **Activity Monitoring** | Audit Logs, User Sessions, Action History | High | User Management |
| 8 | **System Configuration** | Connections, Environment Settings, Feature Flags | Medium | Admin Dashboard |
| 9 | **Data Source Connections** | SQL Server Config, Blob Storage Config, Test Connection | Medium | System Config |
| 10 | **Data Explorer** | Schema Browser, Query Editor, Results Grid | Medium | Data Connections |
| 11 | **Pipeline Designer** | Visual Builder, Node Library, Pipeline Config | Medium | Data Connections |
| 12 | **Pipeline Execution** | Run History, Logs, Scheduling, Alerts | Medium | Pipeline Designer |
| 13 | **Dashboards & Visualization** | Chart Builder, Dashboard Designer, Widgets | Lower | Data Explorer |
| 14 | **Notifications System** | In-App Alerts, Email Config, Notification Center | Lower | Core Complete |
| 15 | **Settings & Preferences** | Theme Toggle, Language, Accessibility | Lower | Profile Complete |
| 16 | **Help & Documentation** | Help Center, Tooltips, Guided Tours | Lower | All Core Complete |

---

## Screen Mockups

### 1. Login Screen

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                                                                 │
│                                                                                 │
│                         ┌─────────────────────────────┐                         │
│                         │                             │                         │
│                         │      ╔═══════════════╗      │                         │
│                         │      ║   ◆ DATAFLOW  ║      │                         │
│                         │      ╚═══════════════╝      │                         │
│                         │                             │                         │
│                         │      Data Platform          │                         │
│                         │                             │                         │
│                         │  ┌─────────────────────┐    │                         │
│                         │  │ 🔷 Sign in with     │    │                         │
│                         │  │    Microsoft        │    │                         │
│                         │  └─────────────────────┘    │                         │
│                         │                             │                         │
│                         │  ─────────  or  ─────────   │                         │
│                         │                             │                         │
│                         │  Email                      │                         │
│                         │  ┌─────────────────────┐    │                         │
│                         │  │ user@company.com    │    │                         │
│                         │  └─────────────────────┘    │                         │
│                         │                             │                         │
│                         │  Password                   │                         │
│                         │  ┌─────────────────────┐    │                         │
│                         │  │ ••••••••••••        │    │                         │
│                         │  └─────────────────────┘    │                         │
│                         │                             │                         │
│                         │  ☐ Remember me              │                         │
│                         │                             │                         │
│                         │  ┌─────────────────────┐    │                         │
│                         │  │      Sign In        │    │                         │
│                         │  └─────────────────────┘    │                         │
│                         │                             │                         │
│                         │  Forgot password?           │                         │
│                         │                             │                         │
│                         └─────────────────────────────┘                         │
│                                                                                 │
│                              © 2025 Your Company                                │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2. Main Dashboard (Admin View)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◆ DATAFLOW                                    🔔 3  👤 John Smith ▼    [Admin] │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  📊 Dashboard      │  Dashboard Overview                                        │
│  ────────────────  │  ═══════════════════════════════════════════════════════   │
│                    │                                                            │
│  👥 Users          │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────┐
│  🔐 Roles          │  │ 👥 USERS     │ │ 🔄 PIPELINES │ │ 📊 QUERIES   │ │ ⚠️  ALERTS  │
│  📋 Activity       │  │              │ │              │ │              │ │             │
│  ────────────────  │  │    247       │ │     12       │ │   1,847      │ │     3       │
│                    │  │  +12 today   │ │  8 running   │ │  today       │ │  critical   │
│  🔗 Connections    │  └──────────────┘ └──────────────┘ └──────────────┘ └─────────────┘
│  📁 Data Explorer  │                                                            │
│  🔀 Pipelines      │  System Health                           Quick Actions     │
│  ────────────────  │  ┌────────────────────────────────┐    ┌─────────────────┐ │
│                    │  │                                │    │ + New User      │ │
│  ⚙️  Settings      │  │  CPU   ████████░░░░  67%      │    │ + New Pipeline  │ │
│  📖 Help           │  │  RAM   ██████░░░░░░  52%      │    │ + New Query     │ │
│                    │  │  Disk  ████░░░░░░░░  38%      │    │ ⚙ Settings      │ │
│                    │  │  API   ✓ Healthy              │    └─────────────────┘ │
│                    │  │  DB    ✓ Connected            │                        │
│                    │  │  Blob  ✓ Connected            │                        │
│                    │  └────────────────────────────────┘                        │
│                    │                                                            │
│                    │  Recent Activity                                           │
│                    │  ┌────────────────────────────────────────────────────────┐│
│                    │  │ 🟢 10:45  john.smith uploaded sales_data.csv           ││
│                    │  │ 🟢 10:42  Pipeline "Daily ETL" completed successfully  ││
│                    │  │ 🟡 10:38  jane.doe failed login attempt (2nd)          ││
│                    │  │ 🟢 10:35  New user mike.wilson@company.com created     ││
│                    │  │ 🔴 10:30  Pipeline "Report Gen" failed - timeout       ││
│                    │  │ 🟢 10:28  admin updated role permissions               ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
└────────────────────┴────────────────────────────────────────────────────────────┘
```

---

### 3. User Management Screen

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◆ DATAFLOW                                    🔔 3  👤 John Smith ▼    [Admin] │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  📊 Dashboard      │  User Management                                           │
│  ────────────────  │  ═══════════════════════════════════════════════════════   │
│                    │                                                            │
│  👥 Users     ◀──  │  ┌────────────────────────────────┐  ┌─────────────────┐   │
│  🔐 Roles          │  │ 🔍 Search users...             │  │ + Invite User   │   │
│  📋 Activity       │  └────────────────────────────────┘  └─────────────────┘   │
│  ────────────────  │                                                            │
│                    │  Filter: [All Users ▼] [All Roles ▼] [All Status ▼]        │
│  🔗 Connections    │                                                            │
│  📁 Data Explorer  │  ┌────────────────────────────────────────────────────────┐│
│  🔀 Pipelines      │  │ ☑  USER             ROLE        STATUS    LAST ACTIVE  ││
│  ────────────────  │  ├────────────────────────────────────────────────────────┤│
│                    │  │ ☐  ┌──┐                                                ││
│  ⚙️  Settings      │  │    │JD│ Jane Doe          Admin       🟢 Active   2 min ago   ││
│  📖 Help           │  │    └──┘ jane@company.com                               ││
│                    │  │                                         [Edit] [···]   ││
│                    │  ├────────────────────────────────────────────────────────┤│
│                    │  │ ☐  ┌──┐                                                ││
│                    │  │    │MW│ Mike Wilson       Data Eng    🟢 Active   15 min ago  ││
│                    │  │    └──┘ mike@company.com                               ││
│                    │  │                                         [Edit] [···]   ││
│                    │  ├────────────────────────────────────────────────────────┤│
│                    │  │ ☐  ┌──┐                                                ││
│                    │  │    │SJ│ Sarah Johnson     Analyst     🟡 Invited  Never       ││
│                    │  │    └──┘ sarah@company.com                              ││
│                    │  │                                         [Edit] [···]   ││
│                    │  ├────────────────────────────────────────────────────────┤│
│                    │  │ ☐  ┌──┐                                                ││
│                    │  │    │TB│ Tom Brown         Viewer      🔴 Disabled 30 days ago ││
│                    │  │    └──┘ tom@company.com                                ││
│                    │  │                                         [Edit] [···]   ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  Showing 1-4 of 247 users          [◀ Prev] [1] [2] [Next ▶]│
│                    │                                                            │
└────────────────────┴────────────────────────────────────────────────────────────┘
```

---

### 4. User Profile Screen

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◆ DATAFLOW                                    🔔 3  👤 John Smith ▼    [Admin] │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  📊 Dashboard      │  ◀ Back to Users                                           │
│  ────────────────  │                                                            │
│                    │  User Profile                                              │
│  👥 Users          │  ═══════════════════════════════════════════════════════   │
│  🔐 Roles          │                                                            │
│  📋 Activity       │  ┌─────────────────────────────────────────────────────┐   │
│  ────────────────  │  │                                                     │   │
│                    │  │   ┌────────┐                                        │   │
│  🔗 Connections    │  │   │        │   Jane Doe                             │   │
│  📁 Data Explorer  │  │   │   JD   │   jane.doe@company.com                 │   │
│  🔀 Pipelines      │  │   │        │   Administrator                        │   │
│  ────────────────  │  │   └────────┘   🟢 Active                            │   │
│                    │  │                                                     │   │
│  ⚙️  Settings      │  │   [Edit Profile]  [Reset Password]  [Disable User] │   │
│  📖 Help           │  │                                                     │   │
│                    │  └─────────────────────────────────────────────────────┘   │
│                    │                                                            │
│                    │  ┌─────────┬───────────┬────────────┬──────────────┐       │
│                    │  │ Details │ Permissions│ Activity   │ Sessions     │       │
│                    │  └─────────┴───────────┴────────────┴──────────────┘       │
│                    │                                                            │
│                    │  Personal Information                                      │
│                    │  ┌─────────────────────────────────────────────────────┐   │
│                    │  │ Full Name        Jane Doe                           │   │
│                    │  │ Email            jane.doe@company.com               │   │
│                    │  │ Phone            +1 (555) 123-4567                  │   │
│                    │  │ Department       Data Engineering                   │   │
│                    │  │ Manager          John Smith                         │   │
│                    │  │ Location         New York, USA                      │   │
│                    │  └─────────────────────────────────────────────────────┘   │
│                    │                                                            │
│                    │  Account Information                                       │
│                    │  ┌─────────────────────────────────────────────────────┐   │
│                    │  │ Created          Jan 15, 2025                       │   │
│                    │  │ Last Login       Today at 10:42 AM                  │   │
│                    │  │ Login Count      347                                │   │
│                    │  │ MFA Enabled      ✓ Yes (Authenticator App)          │   │
│                    │  │ Password Changed Dec 20, 2024                       │   │
│                    │  └─────────────────────────────────────────────────────┘   │
│                    │                                                            │
└────────────────────┴────────────────────────────────────────────────────────────┘
```

---

### 5. Role & Permission Management

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◆ DATAFLOW                                    🔔 3  👤 John Smith ▼    [Admin] │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  📊 Dashboard      │  Role Management                                           │
│  ────────────────  │  ═══════════════════════════════════════════════════════   │
│                    │                                                            │
│  👥 Users          │  ┌──────────────────────────────┐  ┌──────────────────┐    │
│  🔐 Roles     ◀──  │  │ 🔍 Search roles...           │  │ + Create Role    │    │
│  📋 Activity       │  └──────────────────────────────┘  └──────────────────┘    │
│  ────────────────  │                                                            │
│                    │  ┌────────────────────────────────────────────────────────┐│
│  🔗 Connections    │  │ ROLE NAME        USERS   PERMISSIONS    ACTIONS        ││
│  📁 Data Explorer  │  ├────────────────────────────────────────────────────────┤│
│  🔀 Pipelines      │  │ 🛡️  Super Admin    2       All (47)       [Edit] [···] ││
│  ────────────────  │  │     Full system access                                 ││
│                    │  ├────────────────────────────────────────────────────────┤│
│  ⚙️  Settings      │  │ 👔 Admin          5       42 permissions  [Edit] [···] ││
│  📖 Help           │  │     Administrative access                              ││
│                    │  ├────────────────────────────────────────────────────────┤│
│                    │  │ 🔧 Data Engineer  28      31 permissions  [Edit] [···] ││
│                    │  │     Pipeline and data management                       ││
│                    │  ├────────────────────────────────────────────────────────┤│
│                    │  │ 📊 Analyst        156     18 permissions  [Edit] [···] ││
│                    │  │     Query and visualization access                     ││
│                    │  ├────────────────────────────────────────────────────────┤│
│                    │  │ 👁️  Viewer         56      8 permissions   [Edit] [···] ││
│                    │  │     Read-only access                                   ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  Permission Matrix (Admin Role)                            │
│                    │  ┌────────────────────────────────────────────────────────┐│
│                    │  │ CATEGORY        VIEW   CREATE  EDIT   DELETE  ADMIN   ││
│                    │  ├────────────────────────────────────────────────────────┤│
│                    │  │ Users           ✓      ✓       ✓      ✓       ✓       ││
│                    │  │ Roles           ✓      ✓       ✓      ○       ○       ││
│                    │  │ Pipelines       ✓      ✓       ✓      ✓       ✓       ││
│                    │  │ Data Sources    ✓      ✓       ✓      ✓       ○       ││
│                    │  │ Queries         ✓      ✓       ✓      ✓       ○       ││
│                    │  │ Dashboards      ✓      ✓       ✓      ✓       ○       ││
│                    │  │ System Config   ✓      ○       ✓      ○       ○       ││
│                    │  │ Audit Logs      ✓      ○       ○      ○       ○       ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │   ✓ = Granted   ○ = Denied                                 │
└────────────────────┴────────────────────────────────────────────────────────────┘
```

---

### 6. Activity Monitoring / Audit Logs

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◆ DATAFLOW                                    🔔 3  👤 John Smith ▼    [Admin] │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  📊 Dashboard      │  Activity Monitor                                          │
│  ────────────────  │  ═══════════════════════════════════════════════════════   │
│                    │                                                            │
│  👥 Users          │  ┌─────────┬───────────┬────────────┬──────────────┐       │
│  🔐 Roles          │  │ All     │ Logins    │ Data Ops   │ Admin Actions│       │
│  📋 Activity  ◀──  │  └─────────┴───────────┴────────────┴──────────────┘       │
│  ────────────────  │                                                            │
│                    │  Filters                                                   │
│  🔗 Connections    │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐ │
│  📁 Data Explorer  │  │ All Users ▼│ │ All Types ▼│ │ Today    ▼ │ │ Export ↓ │ │
│  🔀 Pipelines      │  └────────────┘ └────────────┘ └────────────┘ └──────────┘ │
│  ────────────────  │                                                            │
│                    │  Live Activity Feed                              🔴 Live   │
│  ⚙️  Settings      │  ┌────────────────────────────────────────────────────────┐│
│  📖 Help           │  │                                                        ││
│                    │  │  10:47:23  🟢  LOGIN                                   ││
│                    │  │  mike.wilson@company.com logged in                     ││
│                    │  │  IP: 192.168.1.45  |  Device: Chrome/Windows           ││
│                    │  │  ─────────────────────────────────────────────────     ││
│                    │  │                                                        ││
│                    │  │  10:45:12  🔵  DATA_UPLOAD                             ││
│                    │  │  john.smith@company.com uploaded file                  ││
│                    │  │  File: sales_data_2025.csv (2.4 MB)                    ││
│                    │  │  Container: raw-data/sales/                            ││
│                    │  │  ─────────────────────────────────────────────────     ││
│                    │  │                                                        ││
│                    │  │  10:42:08  🟢  PIPELINE_SUCCESS                        ││
│                    │  │  Pipeline "Daily Sales ETL" completed                  ││
│                    │  │  Duration: 4m 23s  |  Rows: 145,892                    ││
│                    │  │  ─────────────────────────────────────────────────     ││
│                    │  │                                                        ││
│                    │  │  10:38:55  🟡  LOGIN_FAILED                            ││
│                    │  │  jane.doe@company.com failed login (wrong password)    ││
│                    │  │  IP: 203.45.67.89  |  Attempt: 2 of 5                  ││
│                    │  │  ─────────────────────────────────────────────────     ││
│                    │  │                                                        ││
│                    │  │  10:35:41  🔵  USER_CREATED                            ││
│                    │  │  admin@company.com created new user                    ││
│                    │  │  New User: sarah.j@company.com  |  Role: Analyst       ││
│                    │  │  ─────────────────────────────────────────────────     ││
│                    │  │                                                        ││
│                    │  │  10:30:17  🔴  PIPELINE_FAILED                         ││
│                    │  │  Pipeline "Report Generator" failed                    ││
│                    │  │  Error: Connection timeout to SQL Server               ││
│                    │  │                                                        ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  [Load More...]                                            │
└────────────────────┴────────────────────────────────────────────────────────────┘
```

---

### 7. User Sessions Monitor (Admin)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◆ DATAFLOW                                    🔔 3  👤 John Smith ▼    [Admin] │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  📊 Dashboard      │  Active Sessions                                           │
│  ────────────────  │  ═══════════════════════════════════════════════════════   │
│                    │                                                            │
│  👥 Users          │  Currently Online: 34 users                    [Refresh]   │
│  🔐 Roles          │                                                            │
│  📋 Activity       │  ┌────────────────────────────────────────────────────────┐│
│    ├─ Audit Logs   │  │ USER            LOCATION     DEVICE       DURATION  ⚡ ││
│    ├─ Sessions ◀── │  ├────────────────────────────────────────────────────────┤│
│    └─ Analytics    │  │ 🟢 jane.doe     New York     Chrome/Mac   2h 15m   [×] ││
│  ────────────────  │  │    192.168.1.23              Last: Viewing Dashboard   ││
│                    │  ├────────────────────────────────────────────────────────┤│
│  🔗 Connections    │  │ 🟢 mike.wilson  London       Firefox/Win  45m      [×] ││
│  📁 Data Explorer  │  │    10.0.0.45                 Last: Running Query       ││
│  🔀 Pipelines      │  ├────────────────────────────────────────────────────────┤│
│  ────────────────  │  │ 🟢 tom.brown    Berlin       Safari/iOS   12m      [×] ││
│                    │  │    172.16.0.89               Last: Pipeline Designer   ││
│  ⚙️  Settings      │  ├────────────────────────────────────────────────────────┤│
│  📖 Help           │  │ 🟡 sarah.jones  Sydney       Edge/Win     2h 45m   [×] ││
│                    │  │    203.45.67.12              Last: Idle (30m)          ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  Session Statistics                                        │
│                    │  ┌────────────────────────────────────────────────────────┐│
│                    │  │                                                        ││
│                    │  │  Sessions Today          ████████████████░░░░  156     ││
│                    │  │  Avg Session Duration    ████████░░░░░░░░░░░░  47 min  ││
│                    │  │  Peak Concurrent Users   ████████████░░░░░░░░  52      ││
│                    │  │  Failed Logins Today     ██░░░░░░░░░░░░░░░░░░  8       ││
│                    │  │                                                        ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  [Terminate All Sessions]  [Export Session Log]            │
│                    │                                                            │
└────────────────────┴────────────────────────────────────────────────────────────┘
```

---

### 8. Data Pipeline Designer

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◆ DATAFLOW                                    🔔 3  👤 John Smith ▼    [Admin] │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  📊 Dashboard      │  Pipeline: Daily Sales ETL                    [Save] [Run] │
│  ────────────────  │  ═══════════════════════════════════════════════════════   │
│                    │                                                            │
│  👥 Users          │  ┌──────────────┐                                          │
│  🔐 Roles          │  │ COMPONENTS   │                                          │
│  📋 Activity       │  ├──────────────┤                                          │
│  ────────────────  │  │              │    ┌─────────────────────────────────────│
│                    │  │ 📥 Sources   │    │                                     │
│  🔗 Connections    │  │  ├─ SQL      │    │   ┌─────────┐      ┌─────────┐      │
│  📁 Data Explorer  │  │  ├─ Blob     │    │   │   SQL   │      │ Filter  │      │
│  🔀 Pipelines ◀──  │  │  └─ API      │    │   │  Source │─────▶│ Nulls   │──┐   │
│  ────────────────  │  │              │    │   └─────────┘      └─────────┘  │   │
│                    │  │ 🔄 Transform │    │                                  │   │
│  ⚙️  Settings      │  │  ├─ Filter   │    │   ┌─────────┐      ┌─────────┐  │   │
│  📖 Help           │  │  ├─ Map      │    │   │  Blob   │      │  Join   │  │   │
│                    │  │  ├─ Join     │    │   │  CSV    │─────▶│  Data   │◀─┘   │
│                    │  │  ├─ Aggregate│    │   └─────────┘      └────┬────┘      │
│                    │  │  └─ SQL      │    │                         │           │
│                    │  │              │    │                         ▼           │
│                    │  │ 📤 Outputs   │    │                    ┌─────────┐      │
│                    │  │  ├─ SQL      │    │                    │Aggregate│      │
│                    │  │  ├─ Blob     │    │                    │  Sales  │      │
│                    │  │  └─ API      │    │                    └────┬────┘      │
│                    │  │              │    │                         │           │
│                    │  │ 🔍 Quality   │    │                         ▼           │
│                    │  │  ├─ Validate │    │                    ┌─────────┐      │
│                    │  │  └─ Assert   │    │                    │  Write  │      │
│                    │  │              │    │                    │   SQL   │      │
│                    │  └──────────────┘    │                    └─────────┘      │
│                    │                      │                                     │
│                    │                      └─────────────────────────────────────│
│                    │                                                            │
│                    │  Node Config: Join Data                                    │
│                    │  ┌────────────────────────────────────────────────────────┐│
│                    │  │ Join Type: [Left Join ▼]  On: [customer_id ▼]         ││
│                    │  └────────────────────────────────────────────────────────┘│
└────────────────────┴────────────────────────────────────────────────────────────┘
```

---

### 9. Data Explorer / Query Editor

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◆ DATAFLOW                                    🔔 3  👤 John Smith ▼    [Admin] │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  📊 Dashboard      │  Data Explorer                                             │
│  ────────────────  │  ═══════════════════════════════════════════════════════   │
│                    │                                                            │
│  👥 Users          │  Connection: [Production SQL Server ▼]        [+ New Tab]  │
│  🔐 Roles          │                                                            │
│  📋 Activity       │  ┌──────────────┬─────────────────────────────────────────┐│
│  ────────────────  │  │ SCHEMA       │  Query Editor                  [▶ Run]  ││
│                    │  │ ────────────────────────────────────────────────────── ││
│  🔗 Connections    │  │              │  ┌─────────────────────────────────────┐││
│  📁 Explorer  ◀──  │  │ 📁 dbo       │  │ 1  SELECT                           │││
│  🔀 Pipelines      │  │  ├─ 📋 users │  │ 2    c.name AS customer,            │││
│  ────────────────  │  │  ├─ 📋 orders│  │ 3    COUNT(o.id) AS order_count,    │││
│                    │  │  ├─ 📋 products│ │ 4    SUM(o.total) AS total_spent    │││
│  ⚙️  Settings      │  │  └─ 📋 sales │  │ 5  FROM customers c                  │││
│  📖 Help           │  │              │  │ 6  LEFT JOIN orders o                │││
│                    │  │ 📁 staging   │  │ 7    ON c.id = o.customer_id         │││
│                    │  │  └─ 📋 temp  │  │ 8  WHERE o.created_at > '2025-01-01' │││
│                    │  │              │  │ 9  GROUP BY c.name                   │││
│                    │  │ 📁 analytics │  │ 10 ORDER BY total_spent DESC;        │││
│                    │  │  ├─ 📋 daily │  └─────────────────────────────────────┘││
│                    │  │  └─ 📋 weekly│                                         ││
│                    │  └──────────────┴─────────────────────────────────────────┘│
│                    │                                                            │
│                    │  Results (1,247 rows in 0.34s)      [Export ▼] [Visualize] │
│                    │  ┌────────────────────────────────────────────────────────┐│
│                    │  │ CUSTOMER          ORDER_COUNT    TOTAL_SPENT          ││
│                    │  ├────────────────────────────────────────────────────────┤│
│                    │  │ Acme Corp         234            $1,245,678.00         ││
│                    │  │ Tech Solutions    189            $987,234.00           ││
│                    │  │ Global Industries 156            $756,123.00           ││
│                    │  │ Smith & Co        134            $543,210.00           ││
│                    │  │ DataFirst Inc     98             $321,456.00           ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
└────────────────────┴────────────────────────────────────────────────────────────┘
```

---

### 10. System Settings

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◆ DATAFLOW                                    🔔 3  👤 John Smith ▼    [Admin] │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  📊 Dashboard      │  System Settings                                           │
│  ────────────────  │  ═══════════════════════════════════════════════════════   │
│                    │                                                            │
│  👥 Users          │  ┌───────────┬────────────┬────────────┬─────────────┐     │
│  🔐 Roles          │  │ General   │Connections │ Security   │ Maintenance │     │
│  📋 Activity       │  └───────────┴────────────┴────────────┴─────────────┘     │
│  ────────────────  │                                                            │
│                    │  Security Settings                                         │
│  🔗 Connections    │  ┌────────────────────────────────────────────────────────┐│
│  📁 Data Explorer  │  │                                                        ││
│  🔀 Pipelines      │  │  Authentication                                        ││
│  ────────────────  │  │  ┌────────────────────────────────────────────────┐   ││
│                    │  │  │ Provider          [Azure AD (Entra ID)    ▼]  │   ││
│  ⚙️  Settings ◀──  │  │  │ Tenant ID         a]b2c3d4-e5f6-7890-abcd-...│   ││
│  📖 Help           │  │  │ Client ID         1234abcd-5678-efgh-9012-...│   ││
│                    │  │  │ MFA Required      [✓] Enforce for all users   │   ││
│                    │  │  └────────────────────────────────────────────────┘   ││
│                    │  │                                                        ││
│                    │  │  Session Policy                                        ││
│                    │  │  ┌────────────────────────────────────────────────┐   ││
│                    │  │  │ Session Timeout   [60        ▼] minutes       │   ││
│                    │  │  │ Max Sessions      [3         ▼] per user      │   ││
│                    │  │  │ Idle Timeout      [30        ▼] minutes       │   ││
│                    │  │  │ Remember Me       [✓] Allow "Remember Me"     │   ││
│                    │  │  └────────────────────────────────────────────────┘   ││
│                    │  │                                                        ││
│                    │  │  Password Policy                                       ││
│                    │  │  ┌────────────────────────────────────────────────┐   ││
│                    │  │  │ Min Length        [12        ▼] characters    │   ││
│                    │  │  │ Require Uppercase [✓]                         │   ││
│                    │  │  │ Require Numbers   [✓]                         │   ││
│                    │  │  │ Require Symbols   [✓]                         │   ││
│                    │  │  │ Expiry            [90        ▼] days          │   ││
│                    │  │  └────────────────────────────────────────────────┘   ││
│                    │  │                                                        ││
│                    │  │                              [Cancel]  [Save Changes]  ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
└────────────────────┴────────────────────────────────────────────────────────────┘
```

---

## Permission Layers

### Role-Based Access Control (RBAC) Matrix

| Permission | Super Admin | Admin | Data Engineer | Analyst | Viewer |
|------------|:-----------:|:-----:|:-------------:|:-------:|:------:|
| **USER MANAGEMENT** |||||
| View users | ✓ | ✓ | ○ | ○ | ○ |
| Create users | ✓ | ✓ | ○ | ○ | ○ |
| Edit users | ✓ | ✓ | ○ | ○ | ○ |
| Delete users | ✓ | ✓ | ○ | ○ | ○ |
| Assign roles | ✓ | ✓ | ○ | ○ | ○ |
| Reset passwords | ✓ | ✓ | ○ | ○ | ○ |
| View all activity | ✓ | ✓ | ○ | ○ | ○ |
| **ROLE MANAGEMENT** |||||
| View roles | ✓ | ✓ | ○ | ○ | ○ |
| Create roles | ✓ | ○ | ○ | ○ | ○ |
| Edit roles | ✓ | ✓ | ○ | ○ | ○ |
| Delete roles | ✓ | ○ | ○ | ○ | ○ |
| **DATA CONNECTIONS** |||||
| View connections | ✓ | ✓ | ✓ | ✓ | ○ |
| Create connections | ✓ | ✓ | ✓ | ○ | ○ |
| Edit connections | ✓ | ✓ | ✓ | ○ | ○ |
| Delete connections | ✓ | ✓ | ○ | ○ | ○ |
| Test connections | ✓ | ✓ | ✓ | ✓ | ○ |
| **DATA EXPLORER** |||||
| Browse schemas | ✓ | ✓ | ✓ | ✓ | ✓ |
| Run queries | ✓ | ✓ | ✓ | ✓ | ○ |
| Save queries | ✓ | ✓ | ✓ | ✓ | ○ |
| Export results | ✓ | ✓ | ✓ | ✓ | ○ |
| Run write queries | ✓ | ✓ | ✓ | ○ | ○ |
| **PIPELINES** |||||
| View pipelines | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create pipelines | ✓ | ✓ | ✓ | ○ | ○ |
| Edit pipelines | ✓ | ✓ | ✓ | ○ | ○ |
| Delete pipelines | ✓ | ✓ | ✓ | ○ | ○ |
| Run pipelines | ✓ | ✓ | ✓ | ✓ | ○ |
| Schedule pipelines | ✓ | ✓ | ✓ | ○ | ○ |
| View run history | ✓ | ✓ | ✓ | ✓ | ✓ |
| **BLOB STORAGE** |||||
| Browse containers | ✓ | ✓ | ✓ | ✓ | ✓ |
| Upload files | ✓ | ✓ | ✓ | ✓ | ○ |
| Download files | ✓ | ✓ | ✓ | ✓ | ✓ |
| Delete files | ✓ | ✓ | ✓ | ○ | ○ |
| Manage containers | ✓ | ✓ | ✓ | ○ | ○ |
| **DASHBOARDS** |||||
| View dashboards | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create dashboards | ✓ | ✓ | ✓ | ✓ | ○ |
| Edit dashboards | ✓ | ✓ | ✓ | ✓ | ○ |
| Delete dashboards | ✓ | ✓ | ✓ | ○ | ○ |
| Share dashboards | ✓ | ✓ | ✓ | ✓ | ○ |
| **SYSTEM** |||||
| View settings | ✓ | ✓ | ○ | ○ | ○ |
| Edit settings | ✓ | ✓ | ○ | ○ | ○ |
| View audit logs | ✓ | ✓ | ○ | ○ | ○ |
| Export audit logs | ✓ | ✓ | ○ | ○ | ○ |
| Manage API keys | ✓ | ✓ | ✓ | ○ | ○ |
| System maintenance | ✓ | ○ | ○ | ○ | ○ |

**Legend:** ✓ = Allowed | ○ = Denied

---

## Admin Monitoring Capabilities

### What Admins Can Monitor and See

#### 1. User Activity Monitoring

| Metric | Description | Retention |
|--------|-------------|-----------|
| **Login Events** | Successful/failed logins, IP, device, location | 90 days |
| **Session Duration** | Time spent in application | 90 days |
| **Page Views** | Which screens users access | 30 days |
| **Feature Usage** | Which features are used most | 90 days |
| **Idle Time** | Time users are inactive | 30 days |

#### 2. Security Monitoring

| Event Type | What's Captured | Alert Trigger |
|------------|-----------------|---------------|
| **Failed Logins** | User, IP, timestamp, attempt count | 3+ failures in 5 min |
| **Suspicious IPs** | Geolocation anomalies | New country login |
| **Permission Changes** | Who changed what roles | Any change |
| **Password Resets** | Self-service and admin-initiated | All events |
| **MFA Events** | Enable/disable/bypass attempts | Disable attempts |
| **Session Anomalies** | Multiple concurrent sessions | Threshold exceeded |

#### 3. Data Operations Monitoring

| Operation | Details Captured | Visibility |
|-----------|------------------|------------|
| **Queries Executed** | SQL text, user, duration, rows | Full history |
| **Data Exports** | Format, size, destination | All exports |
| **File Uploads** | Filename, size, container | All uploads |
| **File Downloads** | Filename, size, user | All downloads |
| **Pipeline Runs** | Status, duration, data volume | Full history |
| **Schema Changes** | DDL operations | All changes |

#### 4. System Health Monitoring

| Metric | Description | Dashboard |
|--------|-------------|-----------|
| **API Response Times** | P50, P95, P99 latencies | Real-time |
| **Error Rates** | 4xx, 5xx errors by endpoint | Real-time |
| **Database Connections** | Pool usage, active queries | Real-time |
| **Blob Storage Usage** | Capacity, throughput, operations | Hourly |
| **Memory/CPU** | Backend service resources | Real-time |
| **Queue Depth** | Pipeline task backlog | Real-time |

#### 5. Compliance & Audit

| Report | Contents | Schedule |
|--------|----------|----------|
| **Access Report** | Who accessed what data | On-demand |
| **Permission Changes** | Role/permission modifications | Weekly |
| **Data Export Log** | All data leaving the system | Daily |
| **Login History** | Complete authentication log | On-demand |
| **Admin Actions** | All administrative operations | Real-time |

---

### Admin Dashboard Widgets

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  ADMIN MONITORING DASHBOARD                                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐│
│  │ 🔴 SECURITY ALERTS    │  │ 👥 ACTIVE USERS       │  │ 📊 SYSTEM HEALTH      ││
│  │                       │  │                       │  │                       ││
│  │ • 3 Failed logins     │  │ Currently: 34         │  │ API: ✓ 99.9%          ││
│  │ • 1 Suspicious IP     │  │ Peak today: 52        │  │ DB:  ✓ Connected      ││
│  │ • 0 MFA bypasses      │  │ ▁▂▃▅▆▇█▇▆▅▃▂        │  │ Blob: ✓ Connected     ││
│  │                       │  │ 9am        Now        │  │ Queue: 3 pending      ││
│  └───────────────────────┘  └───────────────────────┘  └───────────────────────┘│
│                                                                                 │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐│
│  │ 🔄 PIPELINE STATUS    │  │ 📈 QUERY ACTIVITY     │  │ 💾 STORAGE USAGE      ││
│  │                       │  │                       │  │                       ││
│  │ Running: 3            │  │ Today: 1,847 queries  │  │ Blob: 2.4 TB / 5 TB   ││
│  │ Queued: 2             │  │ Avg duration: 1.2s    │  │ ████████░░ 48%        ││
│  │ Failed (24h): 1       │  │ Slow queries: 12      │  │                       ││
│  │ Success rate: 98.2%   │  │ ▂▃▅▇█▇▅▃▂▁          │  │ DB: 156 GB / 500 GB   ││
│  └───────────────────────┘  └───────────────────────┘  └───────────────────────┘│
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📋 RECENT ADMIN ACTIONS                                                     ││
│  │─────────────────────────────────────────────────────────────────────────────││
│  │ 10:45  john.smith    Created user sarah.jones@company.com                   ││
│  │ 10:32  admin         Modified role "Data Engineer" - added pipeline:delete  ││
│  │ 10:15  john.smith    Reset password for mike.wilson@company.com             ││
│  │ 09:58  admin         Disabled user tom.brown@company.com                    ││
│  │ 09:45  john.smith    Created new data connection "Production SQL"           ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 🔐 LOGIN ACTIVITY (Last 24 Hours)                                           ││
│  │─────────────────────────────────────────────────────────────────────────────││
│  │                                                                             ││
│  │  Successful  ████████████████████████████████████████████████  156          ││
│  │  Failed      ████                                                8          ││
│  │  MFA Prompt  ████████████████████████████████████████            98         ││
│  │                                                                             ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Design System & Theme

### Color Palette

```
PRIMARY COLORS
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Brand Primary     #6366F1  ████████  Indigo 500               │
│  Brand Secondary   #8B5CF6  ████████  Violet 500               │
│  Brand Accent      #06B6D4  ████████  Cyan 500                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

NEUTRAL COLORS (Light Theme)
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Background        #FFFFFF  ████████  White                    │
│  Surface           #F8FAFC  ████████  Slate 50                 │
│  Border            #E2E8F0  ████████  Slate 200                │
│  Text Primary      #0F172A  ████████  Slate 900                │
│  Text Secondary    #64748B  ████████  Slate 500                │
│  Text Muted        #94A3B8  ████████  Slate 400                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

NEUTRAL COLORS (Dark Theme)
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Background        #0F172A  ████████  Slate 900                │
│  Surface           #1E293B  ████████  Slate 800                │
│  Border            #334155  ████████  Slate 700                │
│  Text Primary      #F8FAFC  ████████  Slate 50                 │
│  Text Secondary    #94A3B8  ████████  Slate 400                │
│  Text Muted        #64748B  ████████  Slate 500                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

SEMANTIC COLORS
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Success           #10B981  ████████  Emerald 500              │
│  Warning           #F59E0B  ████████  Amber 500                │
│  Error             #EF4444  ████████  Red 500                  │
│  Info              #3B82F6  ████████  Blue 500                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Typography

```
FONT FAMILY
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Primary:    Inter (UI elements, body text)                    │
│  Monospace:  JetBrains Mono (code, queries, data)              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

TYPE SCALE
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Display      36px / 2.25rem   ─────────────────────────────   │
│  H1           30px / 1.875rem  ────────────────────────        │
│  H2           24px / 1.5rem    ──────────────────              │
│  H3           20px / 1.25rem   ────────────────                │
│  H4           18px / 1.125rem  ──────────────                  │
│  Body         16px / 1rem      ────────────                    │
│  Small        14px / 0.875rem  ──────────                      │
│  XSmall       12px / 0.75rem   ────────                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Component Styles

```
BUTTONS
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Primary     ┌──────────────────┐                              │
│              │   Save Changes   │  bg: primary, text: white    │
│              └──────────────────┘  hover: primary-600          │
│                                                                 │
│  Secondary   ┌──────────────────┐                              │
│              │     Cancel       │  bg: transparent, border     │
│              └──────────────────┘  hover: slate-100            │
│                                                                 │
│  Danger      ┌──────────────────┐                              │
│              │     Delete       │  bg: red-500, text: white    │
│              └──────────────────┘  hover: red-600              │
│                                                                 │
│  Ghost       ┌──────────────────┐                              │
│              │     More...      │  bg: transparent             │
│              └──────────────────┘  hover: slate-100            │
│                                                                 │
│  Sizes:  sm (32px)  md (40px)  lg (48px)                       │
│  Radius: 8px (rounded-lg)                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

CARDS
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────────────────┐                   │
│  │                                         │   bg: surface     │
│  │  Card Title                             │   border: 1px     │
│  │  ─────────────────────────────────────  │   radius: 12px    │
│  │                                         │   shadow: sm      │
│  │  Card content goes here with proper     │   padding: 24px   │
│  │  spacing and hierarchy.                 │                   │
│  │                                         │                   │
│  │                          [Action]       │                   │
│  └─────────────────────────────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

INPUTS
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Label                                                          │
│  ┌─────────────────────────────────────────┐   height: 40px    │
│  │ Placeholder text...                     │   border: 1px     │
│  └─────────────────────────────────────────┘   radius: 8px     │
│  Helper text or error message                  padding: 12px    │
│                                                                 │
│  States:                                                        │
│  • Default:  border-slate-200                                   │
│  • Focus:    border-primary, ring-2 ring-primary/20            │
│  • Error:    border-red-500, ring-2 ring-red/20                │
│  • Disabled: bg-slate-100, cursor-not-allowed                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

DATA TABLES
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ HEADER     HEADER      HEADER       HEADER              │   │
│  │ bg: slate-50, font-medium, text-slate-600              │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ Cell       Cell        Cell         Cell                │   │
│  │ border-b: slate-100, hover: slate-50                   │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ Cell       Cell        Cell         Cell                │   │
│  │ Alternating: bg-white / bg-slate-50 (optional)         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Features: Sortable headers, sticky header, row selection      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Layout Specifications

```
SIDEBAR
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Width:        280px (expanded) / 72px (collapsed)              │
│  Background:   slate-900 (dark) / white (light)                 │
│  Position:     Fixed left                                        │
│  Z-index:      40                                                │
│                                                                  │
│  Nav Item:                                                       │
│  ┌──────────────────────────────────────┐                       │
│  │ 🔷  Dashboard                        │  height: 44px         │
│  └──────────────────────────────────────┘  padding: 12px 16px   │
│                                            radius: 8px          │
│  Active:   bg-primary/10, text-primary, font-medium             │
│  Hover:    bg-slate-100                                          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

HEADER
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Height:       64px                                              │
│  Background:   white / slate-900 (dark)                         │
│  Border:       border-b slate-200                               │
│  Position:     Sticky top                                        │
│  Z-index:      30                                                │
│                                                                  │
│  Contains:     Logo, Search, Notifications, User Menu           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

CONTENT AREA
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Max-width:    1440px (centered)                                │
│  Padding:      32px (desktop) / 16px (mobile)                   │
│  Background:   slate-50 / slate-950 (dark)                      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

SPACING SCALE
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  4px   (1)   ─     Tight spacing, icon gaps                     │
│  8px   (2)   ──    Form element gaps                            │
│  12px  (3)   ───   Small padding                                │
│  16px  (4)   ────  Standard padding                             │
│  24px  (6)   ─────  Card padding                                │
│  32px  (8)   ──────  Section spacing                            │
│  48px  (12)  ────────  Page sections                            │
│  64px  (16)  ──────────  Large sections                         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Mobile       < 640px    sm:    Sidebar hidden, hamburger menu │
│  Tablet       640-1024px md:    Sidebar collapsed (icons only) │
│  Desktop      1024-1280px lg:   Sidebar expanded              │
│  Wide         > 1280px    xl:   Full layout with panels        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Summary

This design specification provides:

1. **16 development areas** in priority order
2. **10 detailed screen mockups** covering all major interfaces
3. **Complete RBAC matrix** with 5 roles and 35+ permissions
4. **Comprehensive admin monitoring** capabilities across 5 categories
5. **Full design system** with colors, typography, components, and layouts

Ready to start building Phase 1 (Authentication & Core Layout)?
