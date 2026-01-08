from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


# Health check
class HealthResponse(BaseModel):
    status: str
    version: str
    database: str
    blob_storage: str


# User schemas
class User(BaseModel):
    id: int
    name: str
    email: str
    role: str
    status: str
    last_active: str
    avatar_initials: str


class UserListResponse(BaseModel):
    users: List[User]
    total: int
    page: int
    per_page: int


# Stats schemas
class DashboardStats(BaseModel):
    total_users: int
    users_change: str
    pipelines: int
    pipelines_running: int
    queries_today: int
    queries_change: str
    alerts: int
    alerts_critical: int


class SystemHealth(BaseModel):
    cpu_usage: int
    memory_usage: int
    disk_usage: int
    api_status: str
    database_status: str
    blob_storage_status: str


# Activity schemas
class ActivityItem(BaseModel):
    id: int
    type: str
    user: str
    action: str
    details: Optional[str] = None
    ip_address: Optional[str] = None
    device: Optional[str] = None
    timestamp: str


class ActivityListResponse(BaseModel):
    activities: List[ActivityItem]
    total: int


# Role schemas
class Role(BaseModel):
    id: int
    name: str
    description: str
    user_count: int
    permission_count: int


class RoleListResponse(BaseModel):
    roles: List[Role]
