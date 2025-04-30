
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ activeTab, setActiveTab, onLogout }: SidebarProps) => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-bold">Solo-Nation</h3>
        <p className="text-gray-400">Admin Dashboard</p>
      </div>
      
      <ul className="py-4">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'citizens', label: 'Citizen Management' },
          { id: 'tools', label: 'Crypto Tools' },
          { id: 'settings', label: 'Settings' }
        ].map(item => (
          <li 
            key={item.id}
            className={cn(
              "px-6 py-3 border-l-4 cursor-pointer transition-colors",
              activeTab === item.id 
                ? "border-blue-500 bg-gray-700" 
                : "border-transparent hover:bg-gray-700 hover:border-blue-500"
            )}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </li>
        ))}
        <li 
          className="px-6 py-3 border-l-4 border-transparent cursor-pointer hover:bg-gray-700 hover:border-red-500"
          onClick={onLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
