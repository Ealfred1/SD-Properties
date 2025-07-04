import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm mb-3 sm:mb-4">
          <a href="#" className="text-yellow-400 hover:text-yellow-300">Home</a>
          <span className="text-gray-300">›</span>
          <span className="text-gray-300">Dashboard</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
};

export default DashboardHeader;