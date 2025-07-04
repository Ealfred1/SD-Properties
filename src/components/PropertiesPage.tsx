import React from 'react';
import { ChevronRight } from 'lucide-react';

const PropertiesPage: React.FC = () => {
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
    <div className="flex-1 bg-gray-50">
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
  );
};

export default PropertiesPage;