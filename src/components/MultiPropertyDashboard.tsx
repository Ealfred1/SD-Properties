import React, { useState } from 'react';
import { ChevronRight, Plus, Share2 } from 'lucide-react';
import ShareLinkModal from './ShareLinkModal';

const mockProperties = [
  {
    id: 1,
    name: '3th story building',
    address: '55th deacon abel drive, itu rd, Akwa ibom',
    tenant: 'Virtue',
    expiringDate: '12th Mar 2025',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Spacious 2-bedroom flat in a modern building',
    rentAmount: 900000,
    lastPaymentDate: '24th Jan 2025',
    agentName: 'Virtue Andrew',
    agentPhone: '08140435024',
    maintenance: [
      { title: 'Change toilet', date: '20th Mar 2025' },
      { title: 'Painting', date: '20th Mar 2025' },
      { title: 'Change socket', date: '20th Mar 2025' }
    ],
    rentStartDate: '24th Mar 2025',
    rentExpiryDate: '24th Mar 2025',
  },
  // ...more properties
];

const MultiPropertyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showAddMaintenanceModal, setShowAddMaintenanceModal] = useState(false);

  // Add Property Modal (stub)
  const renderAddPropertyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Add a Property</h2>
        <form className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Property name" />
          <input className="w-full border rounded px-3 py-2" placeholder="House Address" />
          <input className="w-full border rounded px-3 py-2" placeholder="Number of apartment" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4">Pay</button>
        </form>
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowAddPropertyModal(false)}>Close</button>
      </div>
    </div>
  );

  // Add Maintenance Modal (stub)
  const renderAddMaintenanceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Add Maintenance</h2>
        <form className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Description" />
          <input className="w-full border rounded px-3 py-2" placeholder="Amount" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4">Add</button>
        </form>
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowAddMaintenanceModal(false)}>Close</button>
      </div>
    </div>
  );

  // Property Detail View (stub)
  const renderPropertyDetail = (property) => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
      {/* Property Details - Left Column */}
      <div className="xl:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {/* Property Image */}
          <div className="mb-4 sm:mb-6">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
            />
          </div>
          {/* Property Info */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{property.name}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm sm:text-base">{property.bedrooms} bedroom flat</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm sm:text-base">{property.bathrooms} bathroom</span>
              </div>
            </div>
            <div className="text-gray-500 text-sm mb-2">{property.address}</div>
            <div className="text-gray-500 text-sm mb-2">Current tenant: {property.tenant}</div>
            <div className="text-gray-500 text-sm mb-2">Expiring date: {property.expiringDate}</div>
          </div>
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 text-sm whitespace-pre-line">{property.description}</p>
          </div>
        </div>
      </div>
      {/* Right Column - Agent Card and Actions */}
      <div className="space-y-6">
        {/* Agent Card */}
        <div className="bg-green-500 text-white rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-1">{property.agentName}</h3>
          <p className="text-green-100 text-xs sm:text-sm mb-3 sm:mb-4">Tenant</p>
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <div className="flex justify-between items-center">
              <span className="text-green-100 text-xs sm:text-sm">Phone number</span>
              <span className="font-semibold text-xs sm:text-sm">{property.agentPhone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100 text-xs sm:text-sm">Price/year</span>
              <span className="font-semibold text-xs sm:text-sm">${property.rentAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100 text-xs sm:text-sm">Last payment date</span>
              <span className="font-semibold text-xs sm:text-sm">{property.lastPaymentDate}</span>
            </div>
          </div>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm mb-3">
            Send a mail
          </button>
        </div>
        {/* Documents */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="text-gray-700 text-sm sm:text-base">Contract documents</span>
            <button className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
              <span role="img" aria-label="download">⬇️</span>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="text-gray-700 text-sm sm:text-base">Receipts</span>
            <button className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
              <span role="img" aria-label="download">⬇️</span>
            </button>
          </div>
        </div>
        {/* Recent Maintenance */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent maintenance</h3>
          <div className="space-y-2 sm:space-y-3">
            {property.maintenance?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2">
                <span className="text-gray-700 text-xs sm:text-sm">{item.title}</span>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Rent Dates */}
        <div className="bg-white rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">Rent Start date</span>
            <span className="font-medium text-sm">{property.rentStartDate}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">Rent expiry date</span>
            <span className="font-medium text-sm">{property.rentExpiryDate}</span>
          </div>
        </div>
        {/* Share & Add Maintenance */}
        <div className="flex space-x-2 mt-4">
          <button className="flex-1 bg-blue-500 text-white py-2 rounded" onClick={() => setShowShareModal(true)}>
            <Share2 className="inline-block mr-1" /> Share
          </button>
          <button className="flex-1 bg-green-500 text-white py-2 rounded" onClick={() => setShowAddMaintenanceModal(true)}>
            <Plus className="inline-block mr-1" /> Add Maintenance
          </button>
        </div>
      </div>
    </div>
  );

  // Main content for each tab
  let mainContent;
  if (activeTab === 'dashboard') {
    mainContent = (
      <>
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold">$12,000</div>
            <div className="text-xs text-gray-500">Total revenue</div>
            <div className="text-xs text-green-600 mt-1">Total revenue made in saintDavies (2.4%)</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold">$123</div>
            <div className="text-xs text-gray-500">Total rent arrears</div>
            <div className="text-xs text-gray-500 mt-1">Total revenue made in saint davies</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-gray-500">Total Apartment</div>
            <div className="text-xs text-gray-500 mt-1">Total revenue made in saint davies</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold">6</div>
            <div className="text-xs text-gray-500">Total rented apartment</div>
            <div className="text-xs text-gray-500 mt-1">Total revenue made in saint davies</div>
          </div>
        </div>
        {/* Apartment List & Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Apartment List */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Apartment list</h2>
              <button className="bg-green-500 text-white px-3 py-1 rounded flex items-center space-x-1" onClick={() => setShowAddPropertyModal(true)}>
                <Plus className="h-4 w-4" /> <span>Add a Property</span>
              </button>
            </div>
            <div className="space-y-4">
              {mockProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded" onClick={() => { setSelectedProperty(property); setActiveTab('property-detail'); }}>
                  <div className="flex items-center space-x-4">
                    <img src={property.image} alt={property.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{property.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">{property.address}</p>
                      <p className="text-xs text-gray-500">Current tenant: <span className="font-medium">{property.tenant}</span></p>
                      <p className="text-xs text-gray-500">Expiring date: {property.expiringDate}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          {/* Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview of expenses and income</h2>
            {/* Placeholder chart */}
            <div className="h-64 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 400 200">
                <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points="0,180 40,120 80,140 120,80 160,100 200,60 240,100 280,80 320,40 360,60 400,20" />
                <polyline fill="none" stroke="#06b6d4" strokeWidth="3" points="0,160 40,100 80,120 120,60 160,80 200,40 240,80 280,60 320,20 360,40 400,0" />
              </svg>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>income</span>
              <span>Expenses</span>
            </div>
          </div>
        </div>
      </>
    );
  } else if (activeTab === 'properties') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold mb-6">Properties list</h2>
        <div className="space-y-4">
          {mockProperties.map((property) => (
            <div key={property.id} className="flex items-center justify-between p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded" onClick={() => { setSelectedProperty(property); setActiveTab('property-detail'); }}>
              <div className="flex items-center space-x-4">
                <img src={property.image} alt={property.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{property.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">{property.address}</p>
                  <p className="text-xs text-gray-500">Current tenant: <span className="font-medium">{property.tenant}</span></p>
                  <p className="text-xs text-gray-500">Expiring date: {property.expiringDate}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
        <button className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg" onClick={() => setShowAddPropertyModal(true)}>
          <Plus className="h-6 w-6" />
        </button>
      </div>
    );
  } else if (activeTab === 'property-detail' && selectedProperty) {
    mainContent = renderPropertyDetail(selectedProperty);
  } else if (activeTab === 'maintenance') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold mb-6">Maintenance</h2>
        <div className="space-y-4">
          {mockProperties.map((property) => (
            <div key={property.id} className="flex items-center justify-between p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded" onClick={() => { setSelectedProperty(property); setActiveTab('property-detail'); }}>
              <div className="flex items-center space-x-4">
                <img src={property.image} alt={property.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{property.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">Last maintenance: <span className="font-medium">12th,Mar 2025</span></p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="text-gray-900 font-bold text-lg">Saint </span>
            <span className="text-green-500 font-bold text-lg">Davies</span>
            <span className="hidden sm:inline text-xs text-gray-500 uppercase tracking-wide ml-2">Properties</span>
          </div>
          <div className="flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-green-500">Home</a>
            <a href="#" className="hover:text-green-500">Properties</a>
            <a href="#" className="hover:text-green-500">Shortlet apartment</a>
            <a href="#" className="hover:text-green-500">Request</a>
            <a href="#" className="hover:text-green-500">Oversea</a>
            <a href="#" className="hover:text-green-500">Contact us</a>
            <a href="#" className="hover:text-green-500">About us</a>
            <a href="#" className="hover:text-green-500">Property management</a>
            <a href="#" className="hover:text-green-500">Dashboard</a>
            <a href="#" className="hover:text-green-500">Log out</a>
          </div>
        </div>
      </nav>
      {/* Dashboard Header */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)' }}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 mb-8 lg:mb-0">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left font-semibold ${
                activeTab === 'dashboard'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span>Dashboard</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'properties'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('properties')}
            >
              <span>Properties</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'maintenance'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('maintenance')}
            >
              <span>Maintenance</span>
            </button>
            <button
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
              onClick={() => window.location.reload()}
            >
              <span>Logout</span>
            </button>
          </div>
        </aside>
        {/* Main Content Area */}
        <main className="flex-1">{mainContent}</main>
      </div>
      {/* Modals */}
      {showShareModal && selectedProperty && (
        <ShareLinkModal propertyName={selectedProperty.name} onClose={() => setShowShareModal(false)} />
      )}
      {showAddPropertyModal && renderAddPropertyModal()}
      {showAddMaintenanceModal && renderAddMaintenanceModal()}
    </div>
  );
};

export default MultiPropertyDashboard; 