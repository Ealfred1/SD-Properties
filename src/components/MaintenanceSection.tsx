import React from 'react';

const MaintenanceSection: React.FC = () => {
  const maintenanceItems = [
    { task: 'Change toilet', date: '20th Mar 2024' },
    { task: 'Painting', date: '20th Mar 2024' },
    { task: 'Change socket', date: '20th Mar 2024' },
  ];

  return (
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
  );
};

export default MaintenanceSection;