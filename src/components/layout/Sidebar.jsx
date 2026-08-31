import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  PlaySquare,
  Bug,
  Terminal,
  Trophy,
  BarChart3,
  User,
  SlidersHorizontal,
} from 'lucide-react';

export const NAV_ITEMS = [
  { path: '/learn', label: 'Learn', icon: PlaySquare },
  { path: '/debug', label: 'Debug', icon: Bug },
  { path: '/output', label: 'Output', icon: Terminal },
  { path: '/challenges', label: 'Challenges', icon: Trophy },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 glass border-r border-slate-800 p-4 h-[calc(100vh-61px)] sticky top-[61px]">
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
        Main Navigation
      </div>

      <nav className="flex-1 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Language Switch shortcut */}
      <div className="pt-4 border-t border-slate-800">
        <NavLink
          to="/select-language"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 transition"
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-400" />
          <span>Manage Languages</span>
        </NavLink>
      </div>
    </aside>
  );
}
