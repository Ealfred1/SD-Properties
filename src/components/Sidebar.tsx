import React from 'react';
import { Home, Building, Settings, LogOut, Users, CreditCard, Wrench } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'properties', label: 'Properties', icon: Building },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'rents', label: 'Rents and payment', icon: CreditCard },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'wishlist', label: 'Wishlist', icon: Settings },
    { id: 'compare', label: 'Compare', icon: Settings },
    { id: 'reviews', label: 'Reviews', icon: Settings },
    { id: 'bookings', label: 'My bookings', icon: Settings },
    { id: 'password', label: 'Change password', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex-shrink-0">
      <div className="p-4 sm:p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;