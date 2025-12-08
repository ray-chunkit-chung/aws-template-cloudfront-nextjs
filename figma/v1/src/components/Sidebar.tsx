import { BarChart3, Database, Users, ShoppingCart, TrendingUp, Settings } from 'lucide-react';

interface SidebarProps {
  selectedApp: string;
  onSelectApp: (app: string) => void;
}

const apps = [
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'database', name: 'Database', icon: Database },
  { id: 'users', name: 'Users', icon: Users },
  { id: 'sales', name: 'Sales', icon: ShoppingCart },
  { id: 'trends', name: 'Trends', icon: TrendingUp },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export function Sidebar({ selectedApp, onSelectApp }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-indigo-600">DataViz Pro</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {apps.map((app) => {
          const Icon = app.icon;
          const isSelected = selectedApp === app.id;
          
          return (
            <button
              key={app.id}
              onClick={() => onSelectApp(app.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isSelected
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{app.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
