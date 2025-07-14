import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

  const properties = [
    {
      id: 1,
      name: 'Flat 1',
    tenant: 'Virtue Andrew',
      expiringDate: '12th Mar 2025',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Modern 2-bedroom apartment with excellent amenities',
    rentAmount: 526,
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
    {
      id: 2,
      name: 'Flat 2',
    tenant: 'Virtue Andrew',
      expiringDate: '12th Mar 2025',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Modern 2-bedroom apartment with excellent amenities',
    rentAmount: 526,
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
  // ... more flats as needed
];

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'properties', label: 'Properties' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'logout', label: 'Logout' },
];

const ViewOnlyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { logout } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  // Property detail view (like TenantDashboard)
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {property.name}
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span role="img" aria-label="bed">🛏️</span>
                </div>
                <span className="text-sm sm:text-base">
                  {property.bedrooms} bedroom flat
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span role="img" aria-label="bath">🛁</span>
                </div>
                <span className="text-sm sm:text-base">
                  {property.bathrooms} bathroom
                </span>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 text-sm whitespace-pre-line">
              {property.description}
            </p>
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
            <span className="text-gray-700 text-sm sm:text-base">Tenancy agreement</span>
            <button className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
              <span role="img" aria-label="download">⬇️</span>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="text-gray-700 text-sm sm:text-base">Rent receipt</span>
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
              <a href="#" className="text-green-600 text-sm font-medium hover:underline">See all</a>
            </div>
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img src={property.image} alt={property.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{property.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">Current tenant: <span className="font-medium">{property.tenant}</span></p>
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
    mainContent = selectedProperty
      ? renderPropertyDetail(selectedProperty)
      : (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold mb-6">Properties list</h2>
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded"
                onClick={() => setSelectedProperty(property)}
              >
                <div className="flex items-center space-x-4">
                  <img src={property.image} alt={property.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{property.name}</h3>
                    <p className="text-xs text-gray-600 mb-1">Current tenant: <span className="font-medium">{property.tenant}</span></p>
                    <p className="text-xs text-gray-500">Expiring date: {property.expiringDate}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      );
  } else if (activeTab === 'maintenance') {
    mainContent = selectedProperty
      ? renderPropertyDetail(selectedProperty)
      : (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold mb-6">Property maintenance</h2>
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded"
                onClick={() => setSelectedProperty(property)}
              >
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
  } else if (activeTab === 'logout') {
    handleLogout();
    mainContent = null;
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
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== 'properties') setSelectedProperty(null);
                }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>
        {/* Main Content Area */}
        <main className="flex-1">{mainContent}</main>
      </div>
    </div>
  );
};

export default ViewOnlyDashboard;