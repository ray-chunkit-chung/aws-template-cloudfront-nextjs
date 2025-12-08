"use client";

import { BarChart3, Database, Users, ShoppingCart, TrendingUp, Settings, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  selectedApp: string;
  onSelectApp: (app: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const apps = [
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "database", name: "Database", icon: Database },
  { id: "users", name: "Users", icon: Users },
  { id: "sales", name: "Sales", icon: ShoppingCart },
  { id: "trends", name: "Trends", icon: TrendingUp },
  { id: "settings", name: "Settings", icon: Settings },
];

export function Sidebar({ selectedApp, onSelectApp, isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside
      className={`bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`p-6 border-b border-gray-800 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && <h1 className="text-white">DataViz Pro</h1>}
        <button
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          className="text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
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
                isSelected ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-800"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? app.name : undefined}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span>{app.name}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
