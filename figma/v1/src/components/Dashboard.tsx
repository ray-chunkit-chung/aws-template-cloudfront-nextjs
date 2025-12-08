import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingBag, Activity } from 'lucide-react';

interface DashboardProps {
  selectedApp: string;
}

const revenueData = [
  { month: 'Jan', revenue: 45000, users: 1200 },
  { month: 'Feb', revenue: 52000, users: 1350 },
  { month: 'Mar', revenue: 48000, users: 1280 },
  { month: 'Apr', revenue: 61000, users: 1520 },
  { month: 'May', revenue: 58000, users: 1480 },
  { month: 'Jun', revenue: 70000, users: 1680 },
];

const trafficData = [
  { date: 'Mon', visits: 2400, pageviews: 4800 },
  { date: 'Tue', visits: 1398, pageviews: 3200 },
  { date: 'Wed', visits: 9800, pageviews: 12000 },
  { date: 'Thu', visits: 3908, pageviews: 6800 },
  { date: 'Fri', visits: 4800, pageviews: 8200 },
  { date: 'Sat', visits: 3800, pageviews: 5900 },
  { date: 'Sun', visits: 4300, pageviews: 7100 },
];

const categoryData = [
  { name: 'Electronics', sales: 58000 },
  { name: 'Clothing', sales: 42000 },
  { name: 'Home & Garden', sales: 35000 },
  { name: 'Sports', sales: 28000 },
  { name: 'Books', sales: 22000 },
];

const stats = [
  { id: 1, name: 'Total Revenue', value: '$334,000', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
  { id: 2, name: 'Active Users', value: '8,530', change: '+8.2%', trend: 'up', icon: Users, color: 'bg-blue-500' },
  { id: 3, name: 'Total Orders', value: '1,234', change: '-3.1%', trend: 'down', icon: ShoppingBag, color: 'bg-purple-500' },
  { id: 4, name: 'Conversion Rate', value: '3.24%', change: '+5.4%', trend: 'up', icon: Activity, color: 'bg-orange-500' },
];

export function Dashboard({ selectedApp }: DashboardProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2>Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your {selectedApp} today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={stat.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-gray-600 text-sm">{stat.name}</div>
              <div className="text-gray-900 mt-1">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4">Revenue & Users</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              <Area type="monotone" dataKey="users" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4">Weekly Traffic</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="pageviews" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Sales */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4">Sales by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="sales" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { user: 'Sarah Johnson', action: 'completed a purchase', amount: '$245.00', time: '2 minutes ago' },
            { user: 'Mike Chen', action: 'signed up for premium', amount: '$29.99', time: '15 minutes ago' },
            { user: 'Emily Davis', action: 'left a 5-star review', amount: null, time: '1 hour ago' },
            { user: 'James Wilson', action: 'completed a purchase', amount: '$189.50', time: '2 hours ago' },
            { user: 'Anna Martinez', action: 'subscribed to newsletter', amount: null, time: '3 hours ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-gray-900">
                    <span>{activity.user}</span> <span className="text-gray-600">{activity.action}</span>
                  </div>
                  <div className="text-gray-500 text-sm">{activity.time}</div>
                </div>
              </div>
              {activity.amount && (
                <div className="text-green-600">{activity.amount}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
