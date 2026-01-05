import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Shield,
  Activity,
  Database,
  FolderSearch,
  GitBranch,
  Settings,
  HelpCircle,
  Bell,
  ChevronDown,
  LogOut,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  Search
} from 'lucide-react'

// Login Screen Component
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-xl mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">DATAFLOW</h1>
          <p className="text-slate-400 mt-2">Data Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Microsoft SSO Button */}
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
              <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
              <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
            </svg>
            Sign in with Microsoft
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 text-sm text-slate-500">or</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@company.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary-500 border-slate-300 rounded focus:ring-primary-500" />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-500 hover:text-primary-600">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          © 2025 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  )
}

// Sidebar Component
function Sidebar({ activeItem, setActiveItem }: { activeItem: string; setActiveItem: (item: string) => void }) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'roles', icon: Shield, label: 'Roles' },
    { id: 'activity', icon: Activity, label: 'Activity' },
    { id: 'connections', icon: Database, label: 'Connections' },
    { id: 'explorer', icon: FolderSearch, label: 'Data Explorer' },
    { id: 'pipelines', icon: GitBranch, label: 'Pipelines' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ]

  return (
    <div className="w-64 bg-slate-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">DATAFLOW</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
            JS
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">John Smith</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </div>
  )
}

// Header Component
function Header({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-100 rounded-lg px-4 py-2 w-96">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none flex-1 text-slate-600"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
            JS
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">John Smith</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

// Stats Card Component
function StatsCard({ icon: Icon, label, value, change, color }: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          <p className={`text-sm mt-2 ${color}`}>{change}</p>
        </div>
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      </div>
    </div>
  )
}

// Activity Item Component
function ActivityItem({ icon: Icon, iconBg, title, description, time }: {
  icon: React.ElementType;
  iconBg: string;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-slate-700">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <span className="text-xs text-slate-400">{time}</span>
    </div>
  )
}

// Dashboard Content
function DashboardContent() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, John. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Users}
          label="Total Users"
          value="247"
          change="+12 today"
          color="text-emerald-500"
        />
        <StatsCard
          icon={GitBranch}
          label="Pipelines"
          value="12"
          change="8 running"
          color="text-blue-500"
        />
        <StatsCard
          icon={FolderSearch}
          label="Queries Today"
          value="1,847"
          change="+23% vs yesterday"
          color="text-emerald-500"
        />
        <StatsCard
          icon={AlertTriangle}
          label="Alerts"
          value="3"
          change="1 critical"
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* System Health */}
        <div className="col-span-1 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">System Health</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">CPU Usage</span>
                <span className="font-medium text-slate-900">67%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Memory</span>
                <span className="font-medium text-slate-900">52%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '52%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Disk</span>
                <span className="font-medium text-slate-900">38%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-600">API: Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-600">Database: Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-600">Blob Storage: Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">View all</button>
          </div>
          <div>
            <ActivityItem
              icon={CheckCircle}
              iconBg="bg-emerald-500"
              title="Login successful"
              description="mike.wilson@company.com logged in"
              time="2 min ago"
            />
            <ActivityItem
              icon={Upload}
              iconBg="bg-blue-500"
              title="File uploaded"
              description="john.smith uploaded sales_data.csv"
              time="15 min ago"
            />
            <ActivityItem
              icon={CheckCircle}
              iconBg="bg-emerald-500"
              title="Pipeline completed"
              description="Daily Sales ETL completed successfully"
              time="23 min ago"
            />
            <ActivityItem
              icon={AlertTriangle}
              iconBg="bg-amber-500"
              title="Login failed"
              description="jane.doe@company.com - wrong password"
              time="38 min ago"
            />
            <ActivityItem
              icon={Users}
              iconBg="bg-violet-500"
              title="User created"
              description="New user sarah.j@company.com added"
              time="1 hour ago"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
            <Users className="w-4 h-4" />
            Add User
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
            <GitBranch className="w-4 h-4" />
            New Pipeline
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
            <FolderSearch className="w-4 h-4" />
            New Query
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}

// Users Content
function UsersContent() {
  const users = [
    { name: 'Jane Doe', email: 'jane@company.com', role: 'Admin', status: 'Active', lastActive: '2 min ago' },
    { name: 'Mike Wilson', email: 'mike@company.com', role: 'Data Engineer', status: 'Active', lastActive: '15 min ago' },
    { name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Analyst', status: 'Invited', lastActive: 'Never' },
    { name: 'Tom Brown', email: 'tom@company.com', role: 'Viewer', status: 'Disabled', lastActive: '30 days ago' },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage users and their permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
          <Users className="w-4 h-4" />
          Invite User
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 flex-1 max-w-md">
          <Search className="w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Search users..." className="bg-transparent border-none outline-none flex-1" />
        </div>
        <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-600">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Data Engineer</option>
          <option>Analyst</option>
          <option>Viewer</option>
        </select>
        <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-600">
          <option>All Status</option>
          <option>Active</option>
          <option>Invited</option>
          <option>Disabled</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">User</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Role</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Last Active</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-600">{user.role}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                    user.status === 'Invited' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-500 text-sm">{user.lastActive}</td>
                <td className="py-4 px-6">
                  <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-slate-500">Showing 1-4 of 247 users</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded transition-colors">Previous</button>
          <button className="px-3 py-1 text-sm bg-primary-500 text-white rounded">1</button>
          <button className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded transition-colors">2</button>
          <button className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded transition-colors">3</button>
          <button className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}

// Activity Content
function ActivityContent() {
  const activities = [
    { type: 'login', user: 'mike.wilson@company.com', action: 'logged in', ip: '192.168.1.45', device: 'Chrome/Windows', time: '10:47:23' },
    { type: 'upload', user: 'john.smith@company.com', action: 'uploaded file', details: 'sales_data_2025.csv (2.4 MB)', time: '10:45:12' },
    { type: 'pipeline_success', user: 'System', action: 'Pipeline "Daily Sales ETL" completed', details: 'Duration: 4m 23s | Rows: 145,892', time: '10:42:08' },
    { type: 'login_failed', user: 'jane.doe@company.com', action: 'failed login (wrong password)', details: 'Attempt: 2 of 5', time: '10:38:55' },
    { type: 'user_created', user: 'admin@company.com', action: 'created new user', details: 'sarah.j@company.com | Role: Analyst', time: '10:35:41' },
    { type: 'pipeline_failed', user: 'System', action: 'Pipeline "Report Generator" failed', details: 'Error: Connection timeout to SQL Server', time: '10:30:17' },
  ]

  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'login': return { bg: 'bg-emerald-500', icon: CheckCircle }
      case 'upload': return { bg: 'bg-blue-500', icon: Upload }
      case 'pipeline_success': return { bg: 'bg-emerald-500', icon: CheckCircle }
      case 'login_failed': return { bg: 'bg-amber-500', icon: AlertTriangle }
      case 'user_created': return { bg: 'bg-violet-500', icon: Users }
      case 'pipeline_failed': return { bg: 'bg-red-500', icon: AlertTriangle }
      default: return { bg: 'bg-slate-500', icon: Activity }
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activity Monitor</h1>
          <p className="text-slate-500">Track all system activity and user actions</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          Live
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-600">
          <option>All Users</option>
        </select>
        <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-600">
          <option>All Types</option>
          <option>Logins</option>
          <option>Data Operations</option>
          <option>Admin Actions</option>
        </select>
        <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-600">
          <option>Today</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
          Export
        </button>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">Live Activity Feed</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {activities.map((activity, i) => {
            const styles = getTypeStyles(activity.type)
            const Icon = styles.icon
            return (
              <div key={i} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.bg}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{activity.type.toUpperCase().replace('_', ' ')}</p>
                    <p className="text-slate-600">{activity.user} {activity.action}</p>
                    {activity.details && <p className="text-sm text-slate-500 mt-1">{activity.details}</p>}
                    {activity.ip && <p className="text-sm text-slate-400 mt-1">IP: {activity.ip} | Device: {activity.device}</p>}
                  </div>
                  <span className="text-sm text-slate-400 font-mono">{activity.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Placeholder Content for other pages
function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">{title}</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-700 mb-2">Coming Soon</h2>
        <p className="text-slate-500">This section is under development.</p>
      </div>
    </div>
  )
}

// Main Dashboard Layout
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeItem, setActiveItem] = useState('dashboard')

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard': return <DashboardContent />
      case 'users': return <UsersContent />
      case 'activity': return <ActivityContent />
      case 'roles': return <PlaceholderContent title="Role Management" />
      case 'connections': return <PlaceholderContent title="Data Connections" />
      case 'explorer': return <PlaceholderContent title="Data Explorer" />
      case 'pipelines': return <PlaceholderContent title="Pipeline Designer" />
      case 'settings': return <PlaceholderContent title="Settings" />
      case 'help': return <PlaceholderContent title="Help & Documentation" />
      default: return <DashboardContent />
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={onLogout} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

// Main App
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  }

  return <Dashboard onLogout={() => setIsLoggedIn(false)} />
}

export default App
