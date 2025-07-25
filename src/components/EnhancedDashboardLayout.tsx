import React, { useState } from 'react';
import { ChevronDown, Menu, X, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import RoleBasedNavigation from './RoleBasedNavigation';
import DashboardOverview from './DashboardOverview';
import PropertiesPage from './PropertiesPage';
import PropertyDetailPage from './PropertyDetailPage';
import MaintenancePage from './MaintenancePage';
import TenantManagerPage from './TenantManagerPage';
import HotelBookingPage from './HotelBookingPage';
import UserManagementPage from './UserManagementPage';
import DashboardHeader from './DashboardHeader';
import ShareLinkModal from './ShareLinkModal';
import ProtectedRoute from './ProtectedRoute';
import HotelBookingSystem from './HotelBookingSystem';
import CarHireSystem from './CarHireSystem';

// Add Property type
interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  state: string;
  price: string;
  is_available: boolean;
  image?: string;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  [key: string]: any;
}

const EnhancedDashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddMaintenanceModal, setShowAddMaintenanceModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);
  const { user, logout, hasPermission } = useAuth();

  // Handler to select a property and go to detail view
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setActiveTab('property-detail');
  };

  // Handler to go back to properties list
  const handleBackToProperties = () => {
    setSelectedProperty(null);
    setActiveTab('properties');
  };

  const handleSelectHotel = (hotel: any) => {
    setSelectedHotel(hotel);
    setActiveTab('hotel');
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'logout') {
      logout();
      return;
    }
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <ProtectedRoute requiredPermission="view_dashboard">
            <DashboardOverview onSelectProperty={handleSelectProperty} />
          </ProtectedRoute>
        );
      case 'properties':
        return (
          <ProtectedRoute requiredPermission="view_properties">
            <PropertiesPage onSelectProperty={handleSelectProperty} />
          </ProtectedRoute>
        );
      case 'property-detail':
        return (
          <ProtectedRoute requiredPermission="view_properties">
            <PropertyDetailPage
              property={selectedProperty}
              onBack={handleBackToProperties}
              onUpdate={() => {}}
              onDelete={() => {}}
              onRequestMaintenance={() => {}}
              onUploadImages={() => {}}
            />
          </ProtectedRoute>
        );
      case 'maintenance':
        return (
          <ProtectedRoute requiredPermission="view_maintenance">
            <MaintenancePage onSelectProperty={handleSelectProperty} />
          </ProtectedRoute>
        );
      case 'tenants':
        return (
          <ProtectedRoute requiredPermission="view_tenants">
            <TenantManagerPage />
          </ProtectedRoute>
        );
      case 'bookings':
        return <HotelBookingPage onSelectHotel={handleSelectHotel} />;
      case 'users':
        return <UserManagementPage />;
      case 'hotel':
        return (
          <ProtectedRoute requiredPermission="view_dashboard">
            <HotelBookingSystem hotel={selectedHotel} />
          </ProtectedRoute>
        );
      case 'car-hire':
        return (
          <ProtectedRoute requiredPermission="view_dashboard">
            <CarHireSystem />
          </ProtectedRoute>
        );
      default:
        return (
          <ProtectedRoute requiredPermission="view_dashboard">
            <DashboardOverview onSelectProperty={handleSelectProperty} />
          </ProtectedRoute>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">S</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-900 font-bold text-sm sm:text-base">Saint </span>
                <span className="text-green-500 font-bold text-sm sm:text-base">Davies</span>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Properties</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-4 lg:space-x-6">
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Home</a>
              {hasPermission('view_properties') && (
                <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Properties</a>
              )}
              <button 
                onClick={() => setActiveTab('hotel')}
                className="text-gray-700 hover:text-green-500 transition-colors text-sm"
              >
                Book hotel
              </button>
              <button 
                onClick={() => setActiveTab('car-hire')}
                className="text-gray-700 hover:text-green-500 transition-colors text-sm"
              >
                Hire a car
              </button>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Request</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Overseas</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Contact</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">About</a>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Share Link Button for Landlords */}
              {hasPermission('manage_property_access') && (
                <button
                  onClick={() => setShowShareModal(true)}
                  className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-green-500 transition-colors text-sm"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              )}
              
              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-gray-700 text-sm capitalize truncate max-w-24">
                  {user?.role?.replace('_', ' ')}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm hidden sm:block">Dashboard</a>
              <button 
                onClick={logout}
                className="text-gray-700 hover:text-green-500 transition-colors text-sm hidden sm:block"
              >
                Log out
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-1 sm:p-2 rounded-md text-gray-700 hover:text-green-500"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-14 sm:top-16 left-0 right-0 bg-white border-b shadow-lg z-40">
            <div className="px-4 py-2 space-y-1">
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors text-sm">Home</a>
              {hasPermission('view_properties') && (
                <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors text-sm">Properties</a>
              )}
              <button 
                onClick={() => setActiveTab('hotel')}
                className="block py-2 text-gray-700 hover:text-green-500 transition-colors text-sm w-full text-left"
              >
                Book hotel
              </button>
              <button 
                onClick={() => setActiveTab('car-hire')}
                className="block py-2 text-gray-700 hover:text-green-500 transition-colors text-sm w-full text-left"
              >
                Hire a car
              </button>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors text-sm">Request</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors text-sm">Overseas</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors text-sm">Contact us</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors text-sm">About us</a>
              <div className="border-t pt-2 mt-2">
                {hasPermission('manage_property_access') && (
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="block py-2 text-gray-700 hover:text-green-500 transition-colors w-full text-left text-sm"
                  >
                    Share Property Link
                  </button>
                )}
                <div className="py-2 text-gray-600 text-sm capitalize">
                  Logged in as: {user?.role?.replace('_', ' ')}
                </div>
                <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors text-sm">Dashboard</a>
                <button 
                  onClick={logout}
                  className="block py-2 text-gray-700 hover:text-green-500 transition-colors w-full text-left text-sm"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block">
            <RoleBasedNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-4">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Navigation</h3>
                <span className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {hasPermission('view_dashboard') && (
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                      activeTab === 'dashboard' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Dashboard
                  </button>
                )}
                {hasPermission('view_properties') && (
                  <button
                    onClick={() => setActiveTab('properties')}
                    className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                      activeTab === 'properties' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Properties
                  </button>
                )}
                {hasPermission('view_maintenance') && (
                  <button
                    onClick={() => setActiveTab('maintenance')}
                    className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                      activeTab === 'maintenance' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Maintenance
                  </button>
                )}
                {hasPermission('view_tenants') && (
                  <button
                    onClick={() => setActiveTab('tenants')}
                    className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                      activeTab === 'tenants' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Tenants
                  </button>
                )}
                {hasPermission('manage_users') && (
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                      activeTab === 'users' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Users
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                    activeTab === 'bookings' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                  }`}
                >
                  Bookings
                </button>
                <button
                  onClick={() => setActiveTab('hotel')}
                  className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                    activeTab === 'hotel' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                  }`}
                >
                  Hotel
                </button>
                <button
                  onClick={() => setActiveTab('car-hire')}
                  className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                    activeTab === 'car-hire' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                  }`}
                >
                  Car Hire
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {renderContent()}
        </div>
      </div>

      {/* Share Link Modal */}
      {showShareModal && selectedProperty && (
        <ShareLinkModal
          propertyName={selectedProperty.title}
          onClose={() => setShowShareModal(false)}
        />
      )}
      {/* Add Maintenance Modal (stub, replace with your modal) */}
      {showAddMaintenanceModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Add Maintenance (Demo)</h2>
            <p>Maintenance modal for {selectedProperty.title}</p>
            <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded" onClick={() => setShowAddMaintenanceModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDashboardLayout;