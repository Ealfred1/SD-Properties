import React, { useState } from 'react';
import { Download, Home, Bath, MessageSquare } from 'lucide-react';
import { TenantData } from '../types/auth';
import MaintenanceRequestModal from './MaintenanceRequestModal';

interface TenantDashboardProps {
  tenantData: TenantData;
}

const TenantDashboard: React.FC<TenantDashboardProps> = ({ tenantData }) => {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <div>
                <span className="text-gray-900 font-bold">Saint </span>
                <span className="text-green-500 font-bold">Davies</span>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Properties</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex items-center space-x-2 text-xs sm:text-sm mb-3 sm:mb-4">
            <a href="#" className="text-yellow-400 hover:text-yellow-300">Home</a>
            <span className="text-gray-300">›</span>
            <span className="text-gray-300">Dashboard</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Property Details - Left Column */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              {/* Property Image */}
              <div className="mb-4 sm:mb-6">
                <img
                  src={tenantData.propertyDetails.image}
                  alt={tenantData.flatNumber}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
                />
              </div>

              {/* Property Info */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {tenantData.flatNumber}
                </h2>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Home className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-sm sm:text-base">
                      {tenantData.propertyDetails.bedrooms} bedroom flat
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Bath className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-sm sm:text-base">
                      {tenantData.propertyDetails.bathrooms} bathroom
                    </span>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700 text-sm sm:text-base">Tenancy agreement</span>
                  <button className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
                    <Download className="h-4 w-4 text-yellow-600" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700 text-sm sm:text-base">Rent receipt</span>
                  <button className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
                    <Download className="h-4 w-4 text-yellow-600" />
                  </button>
                </div>
              </div>

              {/* Recent Maintenance */}
              <div className="bg-white rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent maintenance</h3>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 text-xs sm:text-sm">Change toilet</span>
                    <span className="text-xs text-gray-500">20th Mar 2025</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 text-xs sm:text-sm">Painting</span>
                    <span className="text-xs text-gray-500">20th Mar 2025</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 text-xs sm:text-sm">Change socket</span>
                    <span className="text-xs text-gray-500">20th Mar 2025</span>
                  </div>
                </div>
              </div>

              {/* Rent Dates */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm">Rent start date</span>
                  <span className="font-medium text-sm">{tenantData.rentStartDate}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm">Rent expiry date</span>
                  <span className="font-medium text-sm">{tenantData.rentExpiryDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tenant Card */}
          <div className="space-y-6">
            <div className="bg-green-500 text-white rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-1">{tenantData.name}</h3>
              <p className="text-green-100 text-xs sm:text-sm mb-3 sm:mb-4">Tenant</p>
              
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Phone number</span>
                  <span className="font-semibold text-xs sm:text-sm">{tenantData.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Price/year</span>
                  <span className="font-semibold text-xs sm:text-sm">${tenantData.rentAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Expiry date</span>
                  <span className="font-semibold text-xs sm:text-sm">{tenantData.expiryDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Last payment date</span>
                  <span className="font-semibold text-xs sm:text-sm">{tenantData.lastPaymentDate}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowMaintenanceModal(true)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm mb-3"
              >
                Request for maintenance
              </button>

              <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm flex items-center justify-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Send a mail</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Request Modal */}
      {showMaintenanceModal && (
        <MaintenanceRequestModal
          onClose={() => setShowMaintenanceModal(false)}
          tenantData={tenantData}
        />
      )}
    </div>
  );
};

export default TenantDashboard;