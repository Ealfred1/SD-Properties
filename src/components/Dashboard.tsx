import React, { useState } from 'react';
import { Home, Building, Users, MessageSquare, FileText, Settings, ChevronDown, Download, Calendar, User, Phone, LogOut, Menu, X } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import PropertyDetails from './PropertyDetails';
import AgentCard from './AgentCard';
import MaintenanceSection from './MaintenanceSection';

interface DashboardProps {
  onShowSignup: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onShowSignup }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <span className="text-gray-700 text-sm">Property management</span>
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
                <a href="#" className="block py-2 text-gray-700 hover:text-green-500 transition-colors">Property management</a>
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Property Details - Left Column */}
          <div className="xl:col-span-2">
            <PropertyDetails />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AgentCard onRequestMaintenance={onShowSignup} />
            <MaintenanceSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;