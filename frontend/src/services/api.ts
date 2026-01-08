// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Types matching backend schemas
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  last_active: string;
  avatar_initials: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  per_page: number;
}

export interface DashboardStats {
  total_users: number;
  users_change: string;
  pipelines: number;
  pipelines_running: number;
  queries_today: number;
  queries_change: string;
  alerts: number;
  alerts_critical: number;
}

export interface SystemHealth {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  api_status: string;
  database_status: string;
  blob_storage_status: string;
}

export interface ActivityItem {
  id: number;
  type: string;
  user: string;
  action: string;
  details?: string;
  ip_address?: string;
  device?: string;
  timestamp: string;
}

export interface ActivityListResponse {
  activities: ActivityItem[];
  total: number;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  user_count: number;
  permission_count: number;
}

export interface RoleListResponse {
  roles: Role[];
}

export interface HealthResponse {
  status: string;
  version: string;
  database: string;
  blob_storage: string;
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Health
  async getHealth(): Promise<HealthResponse> {
    return this.fetch<HealthResponse>('/api/health');
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    return this.fetch<DashboardStats>('/api/dashboard/stats');
  }

  async getSystemHealth(): Promise<SystemHealth> {
    return this.fetch<SystemHealth>('/api/dashboard/health');
  }

  // Users
  async getUsers(page = 1, perPage = 10): Promise<UserListResponse> {
    return this.fetch<UserListResponse>(`/api/users?page=${page}&per_page=${perPage}`);
  }

  async getUser(id: number): Promise<User> {
    return this.fetch<User>(`/api/users/${id}`);
  }

  // Activity
  async getActivity(limit = 20): Promise<ActivityListResponse> {
    return this.fetch<ActivityListResponse>(`/api/activity?limit=${limit}`);
  }

  // Roles
  async getRoles(): Promise<RoleListResponse> {
    return this.fetch<RoleListResponse>('/api/roles');
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);
