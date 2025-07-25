import React, { useState } from 'react';
import { Download, Home, Bath } from 'lucide-react';
import MaintenanceRequestModal from './MaintenanceRequestModal';
import { useAuth } from '../contexts/AuthContext';

const TenantDashboard: React.FC = () => {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const { logout, tenantData } = useAuth();

  if (!tenantData || !tenantData.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading tenant data...</h2>
          <p className="text-gray-600">Please wait or try logging in again.</p>
        </div>
      </div>
    );
  }

  // Extract user, unit, property, files
  const user = tenantData.user;
  const userAttr = user.attributes || {};
  const unit = user.relationships?.unit;
  const unitAttr = unit?.attributes || {};
  const property = unit?.relationships?.property;
  const propertyAttr = property?.attributes || {};
  type PropertyFile = { id: number; attributes: { name: string; path: string } };
  const files: PropertyFile[] = (property?.relationships?.files || []) as PropertyFile[];
  
  // Also get property_apartment data if available
  const propertyApartment = tenantData.property_apartment;
  const apartmentAttr = propertyApartment?.attributes || {};
  const apartmentProperty = propertyApartment?.relationships?.property;
  const apartmentPropertyAttr = apartmentProperty?.attributes || {};
  const apartmentFiles: PropertyFile[] = (apartmentProperty?.relationships?.files || []) as PropertyFile[];

  return (
    <div className="min-h-screen">
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
            <button
              onClick={logout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${files[0]?.attributes?.path || apartmentFiles[0]?.attributes?.path || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop'})`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex items-center space-x-2 text-xs sm:text-sm mb-3 sm:mb-4">
            <a href="#" className="text-yellow-400 hover:text-yellow-300">Home</a>
            <span className="text-gray-300">›</span>
            <span className="text-gray-300">Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Welcome, {userAttr.name}</h1>
          <div className="text-sm text-gray-200 mt-2">Tenant Number: {userAttr.tenant_number}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Property Details - Left Column */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              {/* Property Image Gallery */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Images</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(files.length > 0 ? files : apartmentFiles).map((file: PropertyFile) => (
                    <img
                      key={file.id}
                      src={file.attributes?.path}
                      alt={file.attributes?.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
              {/* Property Info */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {(propertyAttr.title || apartmentPropertyAttr.title)} ({unitAttr.name || apartmentAttr.name})
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Home className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-sm sm:text-base">
                      {unitAttr.bed_room || apartmentAttr.bed_room} bedroom flat
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Bath className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-sm sm:text-base">
                      {unitAttr.bath_room || apartmentAttr.bath_room} bathroom
                    </span>
                  </div>
                </div>
                <div className="text-gray-700 text-sm mb-2">
                  {(propertyAttr.address || apartmentPropertyAttr.address)}, {(propertyAttr.city || apartmentPropertyAttr.city)}, {(propertyAttr.state || apartmentPropertyAttr.state)}
                </div>
                <div className="text-gray-700 text-sm mb-4">
                  Rent: ₦{(unitAttr.rent_amount || apartmentAttr.rent_amount)} / {(unitAttr.rent_frequency || apartmentAttr.rent_frequency)}
                </div>
                
                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {unitAttr.parking && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Parking</span>}
                    {unitAttr.security && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Security</span>}
                    {unitAttr.water && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Water</span>}
                    {unitAttr.electricity && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Electricity</span>}
                    {unitAttr.internet && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Internet</span>}
                    {unitAttr.tv && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">TV</span>}
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">
                  {propertyAttr.description || apartmentPropertyAttr.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>
          {/* Right Column - Tenant Info and Actions */}
          <div className="space-y-6">
            {/* Tenant Card */}
            <div className="bg-green-500 text-white rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-1">{userAttr.name}</h3>
              <p className="text-green-100 text-xs sm:text-sm mb-3 sm:mb-4">Tenant</p>
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Phone number</span>
                  <span className="font-semibold text-xs sm:text-sm">{userAttr.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Email</span>
                  <span className="font-semibold text-xs sm:text-sm">{userAttr.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Marital Status</span>
                  <span className="font-semibold text-xs sm:text-sm">{userAttr.marital_status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Gender</span>
                  <span className="font-semibold text-xs sm:text-sm">{userAttr.gender || 'Not specified'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Nationality</span>
                  <span className="font-semibold text-xs sm:text-sm">{userAttr.nationality || 'Not specified'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Occupation</span>
                  <span className="font-semibold text-xs sm:text-sm">{userAttr.occupation || 'Not specified'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Income</span>
                  <span className="font-semibold text-xs sm:text-sm">{userAttr.income || 'Not specified'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Rent Start</span>
                  <span className="font-semibold text-xs sm:text-sm">{userAttr.rent_start}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100 text-xs sm:text-sm">Rent End</span>
                  <span className="font-semibold text-xs sm:text-sm">{userAttr.rent_end}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowMaintenanceModal(true)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm mb-3"
              >
                Request for maintenance
              </button>
            </div>
            {/* Documents */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700 text-sm sm:text-base">Tenancy agreement</span>
                {(unitAttr.agreement_file || apartmentAttr.agreement_file) && (
                  <a href={(unitAttr.agreement_file ?? undefined) || (apartmentAttr.agreement_file ?? undefined) || undefined} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
                    <Download className="h-4 w-4 text-yellow-600" />
                  </a>
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700 text-sm sm:text-base">Rent receipt</span>
                {(unitAttr.payment_receipt || apartmentAttr.payment_receipt) && (
                  <a href={(unitAttr.payment_receipt ?? undefined) || (apartmentAttr.payment_receipt ?? undefined) || undefined} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
                    <Download className="h-4 w-4 text-yellow-600" />
                  </a>
                )}
              </div>
            </div>
            {/* Property Details */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 text-sm">Property Type</span>
                  <span className="font-medium text-sm">{propertyAttr.property_type || apartmentPropertyAttr.property_type}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 text-sm">Status</span>
                  <span className="font-medium text-sm">{propertyAttr.status || apartmentPropertyAttr.status}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 text-sm">Price</span>
                  <span className="font-medium text-sm">₦{(propertyAttr.price || apartmentPropertyAttr.price)}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 text-sm">Created</span>
                  <span className="font-medium text-sm">{(propertyAttr.created_at || apartmentPropertyAttr.created_at)?.split(' ')[0]}</span>
                </div>
              </div>
            </div>
            {/* Rent Dates */}
            <div className="bg-white rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rent Information</h3>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm">Rent Start date</span>
                <span className="font-medium text-sm">{userAttr.rent_start}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm">Rent expiration date</span>
                <span className="font-medium text-sm">{userAttr.rent_end}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm">Active Status</span>
                <span className={`font-medium text-sm ${userAttr.is_active === "1" ? "text-green-600" : "text-red-600"}`}>
                  {userAttr.is_active === "1" ? "Active" : "Inactive"}
                </span>
              </div>
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