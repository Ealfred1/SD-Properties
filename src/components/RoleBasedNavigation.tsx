import React from 'react';
import { Home, Building, Settings, LogOut, Users, CreditCard, Wrench, UserPlus, BarChart3, Hotel, Car } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface RoleBasedNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RoleBasedNavigation: React.FC<RoleBasedNavigationProps> = ({ activeTab, onTabChange }) => {
  const { hasPermission, user } = useAuth();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      permission: 'view_dashboard' as const
    },
    { 
      id: 'properties', 
      label: 'Properties', 
      icon: Building, 
      permission: 'view_properties' as const
    },
    { 
      id: 'tenants', 
      label: 'Tenants', 
      icon: Users, 
      permission: 'view_tenants' as const
    },
    { 
      id: 'rents', 
      label: 'Rents & Payment', 
      icon: CreditCard, 
      permission: 'view_financials' as const
    },
    { 
      id: 'maintenance', 
      label: 'Maintenance', 
      icon: Wrench, 
      permission: 'view_maintenance' as const
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      permission: 'view_analytics' as const
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: UserPlus, 
      permission: 'manage_users' as const
    },
    { 
      id: 'bookings', 
      label: 'Hotel Bookings', 
      icon: Settings, 
      permission: 'view_dashboard' as const
    },
    { 
      id: 'hotel', 
      label: 'Book Hotel', 
      icon: Hotel, 
      permission: 'view_dashboard' as const
    },
    { 
      id: 'car-hire', 
      label: 'Hire a Car', 
      icon: Car, 
      permission: 'view_dashboard' as const
    }
  ];

  // Filter menu items based on user permissions
  const visibleMenuItems = menuItems.filter(item => hasPermission(item.permission));

  return (
    <div className="w-56 lg:w-64 bg-white shadow-sm border-r border-gray-200 flex-shrink-0">
      <div className="p-3 sm:p-4 lg:p-6">
        {/* User Info */}
        <div className="mb-4 lg:mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-semibold text-gray-900 truncate">{user?.name}</div>
          <div className="text-xs text-gray-600 capitalize">{user?.role?.replace('_', ' ')}</div>
          <div className="text-xs text-green-600 mt-1">
            {user?.properties?.length || 0} Properties
          </div>
        </div>

        <nav className="space-y-1 lg:space-y-2">
          {visibleMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-2 lg:space-x-3 px-2 lg:px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
              <span className="text-xs lg:text-sm font-medium truncate">{item.label}</span>
            </button>
          ))}
          
          <div className="pt-3 lg:pt-4 border-t border-gray-200">
            <button
              onClick={() => onTabChange('logout')}
              className="w-full flex items-center space-x-2 lg:space-x-3 px-2 lg:px-3 py-2 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
              <span className="text-xs lg:text-sm font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default RoleBasedNavigation;