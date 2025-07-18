import React from 'react';
import { Home, Bath } from 'lucide-react';

const TenantDetailPage: React.FC = () => {
  const maintenanceHistory = [
    { detail: 'House Rent', amount: '23,000', receipt: true },
    { detail: 'House Rent', amount: '23,000', receipt: true },
    { detail: 'House Rent', amount: '23,000', receipt: true },
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

            {/* Maintenance History */}
            <div className="bg-white rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance history</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Detail</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceHistory.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">{item.detail}</td>
                        <td className="py-3 px-4 text-gray-700">{item.amount}</td>
                        <td className="py-3 px-4">
                          {item.receipt && (
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition-colors">
                              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tenant Card */}
        <div className="space-y-6">
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
                <span className="text-green-100 text-xs sm:text-sm">Expiry date</span>
                <span className="font-semibold text-xs sm:text-sm">3rd Mar 2024</span>
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
        </div>
      </div>
    </div>
  );
};

export default TenantDetailPage;