import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import DashboardOverview from './DashboardOverview';
import PropertiesPage from './PropertiesPage';
import PropertyDetailPage from './PropertyDetailPage';
import MaintenancePage from './MaintenancePage';
import TenantDetailPage from './TenantDetailPage';
import HotelBookingPage from './HotelBookingPage';
import DashboardHeader from './DashboardHeader';

const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'properties':
        return <PropertiesPage />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'maintenance':
        return <MaintenancePage />;
      case 'tenants':
        return <TenantDetailPage />;
      case 'bookings':
        return <HotelBookingPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-900 font-bold">Saint </span>
                <span className="text-green-500 font-bold">Davies</span>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Properties</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Home</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Properties</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Short-let apartment</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Request</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Overseas</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">Contact us</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm">About us</a>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-gray-700 text-sm">Book hotel</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm hidden sm:block">Dashboard</a>
              <a href="#" className="text-gray-700 hover:text-green-500 transition-colors text-sm hidden sm:block">Log out</a>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-md text-gray-700 hover:text-green-500"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-40">
            <div className="px-4 py-2 space-y-2">
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Home</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Properties</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Short-let apartment</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Request</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Overseas</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Contact us</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">About us</a>
              <div className="border-t pt-2 mt-2">
                <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Book hotel</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Dashboard</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Log out</a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden mb-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Navigation</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeTab === 'dashboard' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('properties')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeTab === 'properties' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Properties
                  </button>
                  <button
                    onClick={() => setActiveTab('maintenance')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeTab === 'maintenance' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Maintenance
                  </button>
                  <button
                    onClick={() => setActiveTab('tenants')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeTab === 'tenants' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Tenants
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeTab === 'bookings' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    Hotel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;