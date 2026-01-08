from fastapi import APIRouter
from app.schemas.responses import (
    HealthResponse,
    UserListResponse,
    User,
    DashboardStats,
    SystemHealth,
    ActivityListResponse,
    ActivityItem,
    RoleListResponse,
    Role,
)
from app.core.config import settings

router = APIRouter()


# Health check endpoint
@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Check API and service health"""
    return HealthResponse(
        status="healthy",
        version=settings.API_VERSION,
        database="connected" if settings.SQL_SERVER_HOST else "not_configured",
        blob_storage="connected" if settings.AZURE_STORAGE_ACCOUNT_NAME else "not_configured",
    )


# Dashboard endpoints
@router.get("/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    """Get dashboard statistics"""
    # Mock data - will be replaced with real database queries
    return DashboardStats(
        total_users=247,
        users_change="+12 today",
        pipelines=12,
        pipelines_running=8,
        queries_today=1847,
        queries_change="+23% vs yesterday",
        alerts=3,
        alerts_critical=1,
    )


@router.get("/dashboard/health", response_model=SystemHealth)
async def get_system_health():
    """Get system health metrics"""
    # Mock data - will be replaced with real monitoring
    return SystemHealth(
        cpu_usage=67,
        memory_usage=52,
        disk_usage=38,
        api_status="healthy",
        database_status="connected",
        blob_storage_status="connected",
    )


# User endpoints
@router.get("/users", response_model=UserListResponse)
async def get_users(page: int = 1, per_page: int = 10, search: str = None):
    """Get paginated list of users"""
    # Mock data - will be replaced with real database queries
    mock_users = [
        User(
            id=1,
            name="Jane Doe",
            email="jane@company.com",
            role="Admin",
            status="Active",
            last_active="2 min ago",
            avatar_initials="JD",
        ),
        User(
            id=2,
            name="Mike Wilson",
            email="mike@company.com",
            role="Data Engineer",
            status="Active",
            last_active="15 min ago",
            avatar_initials="MW",
        ),
        User(
            id=3,
            name="Sarah Johnson",
            email="sarah@company.com",
            role="Analyst",
            status="Invited",
            last_active="Never",
            avatar_initials="SJ",
        ),
        User(
            id=4,
            name="Tom Brown",
            email="tom@company.com",
            role="Viewer",
            status="Disabled",
            last_active="30 days ago",
            avatar_initials="TB",
        ),
    ]

    return UserListResponse(
        users=mock_users,
        total=247,
        page=page,
        per_page=per_page,
    )


@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    """Get a specific user by ID"""
    return User(
        id=user_id,
        name="Jane Doe",
        email="jane@company.com",
        role="Admin",
        status="Active",
        last_active="2 min ago",
        avatar_initials="JD",
    )


# Activity endpoints
@router.get("/activity", response_model=ActivityListResponse)
async def get_activity(limit: int = 20, type: str = None):
    """Get activity log"""
    # Mock data - will be replaced with real audit log
    mock_activities = [
        ActivityItem(
            id=1,
            type="login",
            user="mike.wilson@company.com",
            action="logged in",
            ip_address="192.168.1.45",
            device="Chrome/Windows",
            timestamp="10:47:23",
        ),
        ActivityItem(
            id=2,
            type="upload",
            user="john.smith@company.com",
            action="uploaded file",
            details="sales_data_2025.csv (2.4 MB)",
            timestamp="10:45:12",
        ),
        ActivityItem(
            id=3,
            type="pipeline_success",
            user="System",
            action='Pipeline "Daily Sales ETL" completed',
            details="Duration: 4m 23s | Rows: 145,892",
            timestamp="10:42:08",
        ),
        ActivityItem(
            id=4,
            type="login_failed",
            user="jane.doe@company.com",
            action="failed login (wrong password)",
            details="Attempt: 2 of 5",
            timestamp="10:38:55",
        ),
        ActivityItem(
            id=5,
            type="user_created",
            user="admin@company.com",
            action="created new user",
            details="sarah.j@company.com | Role: Analyst",
            timestamp="10:35:41",
        ),
        ActivityItem(
            id=6,
            type="pipeline_failed",
            user="System",
            action='Pipeline "Report Generator" failed',
            details="Error: Connection timeout to SQL Server",
            timestamp="10:30:17",
        ),
    ]

    return ActivityListResponse(
        activities=mock_activities,
        total=len(mock_activities),
    )


# Role endpoints
@router.get("/roles", response_model=RoleListResponse)
async def get_roles():
    """Get all roles"""
    mock_roles = [
        Role(
            id=1,
            name="Super Admin",
            description="Full system access",
            user_count=2,
            permission_count=47,
        ),
        Role(
            id=2,
            name="Admin",
            description="Administrative access",
            user_count=5,
            permission_count=42,
        ),
        Role(
            id=3,
            name="Data Engineer",
            description="Pipeline and data management",
            user_count=28,
            permission_count=31,
        ),
        Role(
            id=4,
            name="Analyst",
            description="Query and visualization access",
            user_count=156,
            permission_count=18,
        ),
        Role(
            id=5,
            name="Viewer",
            description="Read-only access",
            user_count=56,
            permission_count=8,
        ),
    ]

    return RoleListResponse(roles=mock_roles)
