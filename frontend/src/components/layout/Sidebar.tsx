import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  BookOpen, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Target, 
  Lightbulb,
  Settings,
  UserCircle
} from 'lucide-react';

export default function Sidebar() {
  const mainLinks = [
    { name: 'Overview', to: '/', icon: LayoutDashboard },
    { name: 'Districts', to: '/districts', icon: Map },
    { name: 'Courses', to: '/courses', icon: BookOpen },
    { name: 'Providers', to: '/providers', icon: Building2 },
    { name: 'Employment', to: '/employment', icon: Briefcase },
    { name: 'Retention & Wage', to: '/retention', icon: TrendingUp },
    { name: 'Skill Gaps', to: '/skill-gaps', icon: Target },
    { name: 'AI Policy Copilot', to: '/copilot', icon: Lightbulb },
  ];

  const bottomLinks = [
    { name: 'Settings', to: '/settings', icon: Settings },
    { name: 'Profile', to: '/profile', icon: UserCircle },
  ];

  return (
    <aside className="w-64 bg-neutral-900 text-neutral-300 flex flex-col h-[calc(100vh-32px)] sticky top-0">
      <div className="p-6 border-b border-neutral-800">
        <h1 className="text-xl font-bold text-white tracking-tight">SKILLPULSE</h1>
        <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">MH Intelligence</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="mb-4 px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Intelligence
        </div>
        {mainLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-900 text-white' 
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                }`
              }
            >
              <Icon size={18} className="mr-3 flex-shrink-0" />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800 space-y-1">
        {bottomLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-900 text-white' 
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                }`
              }
            >
              <Icon size={18} className="mr-3 flex-shrink-0" />
              {link.name}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
