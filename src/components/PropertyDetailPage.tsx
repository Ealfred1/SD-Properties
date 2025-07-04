import React from 'react';
import { Home, Bath, Download } from 'lucide-react';

const PropertyDetailPage: React.FC = () => {
  const maintenanceItems = [
    { task: 'Change toilet', date: '20th Mar 2025' },
    { task: 'Painting', date: '20th Mar 2025' },
    { task: 'Change socket', date: '20th Mar 2025' },
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Property Details - Left Column */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            {/* Property Image */}
            <div className="mb-4 sm:mb-6">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Modern house"
                className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
              />
            </div>

            {/* Property Info */}
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Flat 1</h2>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Home className="h-4 w-4 text-yellow-600" />
                  </div>
                  <span className="text-sm sm:text-base">2 bedroom flat</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Bath className="h-4 w-4 text-yellow-600" />
                  </div>
                  <span className="text-sm sm:text-base">2 bathroom</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Description</h3>
              <div className="text-gray-600 space-y-2 text-xs sm:text-sm leading-relaxed">
                <p>quelyejeskinrlngjeroyfmrguregrygg erev ervcurv fd vgve revs vev affgjpref etef errerf o rejeog orgagg rgjrgeg gg g gqlgqrg gqrg gqrg cqrg geqrgjrg gqrg qgeqrgjrg gqrg qgqrgjrg gqrg qgqrgjrg gqrg qgqrgjrg grgqrg fw fgvwve kggl gee gqrg a gqrgjrg</p>
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700 text-sm sm:text-base">Tenancy agreement</span>
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition-colors">
                  <Download className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700 text-sm sm:text-base">Rent receipt</span>
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition-colors">
                  <Download className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Tenant Card */}
          <div className="bg-green-500 text-white rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-1">Virtue Andrew</h3>
            <p className="text-green-100 text-xs sm:text-sm mb-3 sm:mb-4">Tenant</p>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between items-center">
                <span className="text-green-100 text-xs sm:text-sm">Phone number</span>
                <span className="font-semibold text-xs sm:text-sm">08140435026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100 text-xs sm:text-sm">Price</span>
                <span className="font-semibold text-xs sm:text-sm">$526</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100 text-xs sm:text-sm">Last payment date</span>
                <span className="font-semibold text-xs sm:text-sm">$526</span>
              </div>
            </div>
            
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm">
              Send a mail
            </button>
          </div>

          {/* Recent Maintenance */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent maintenance</h3>
            
            <div className="space-y-2 sm:space-y-3">
              {maintenanceItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-700 text-xs sm:text-sm">{item.task}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;