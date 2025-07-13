import React from 'react';
import { Download, Home, Bath, ChevronRight } from 'lucide-react';

const ViewOnlyDashboard: React.FC = () => {
  const properties = [
    {
      id: 1,
      name: 'Flat 1',
      tenant: 'Virtue',
      expiringDate: '12th Mar 2025',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Flat 2',
      tenant: 'Virtue',
      expiringDate: '12th Mar 2025',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Flat 3',
      tenant: 'Virtue',
      expiringDate: '12th Mar 2025',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Flat 4',
      tenant: 'Virtue',
      expiringDate: '12th Mar 2025',
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Flat 5',
      tenant: 'Virtue',
      expiringDate: '12th Mar 2025',
      image: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

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
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">View Only Access</span>
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
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Properties list</h2>
          
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      {property.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Current tenant: <span className="font-medium">{property.tenant}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Expiring date: {property.expiringDate}
                    </p>
                  </div>
                </div>
                
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOnlyDashboard;