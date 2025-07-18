import React from 'react';

interface AgentCardProps {
  onRequestMaintenance: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ onRequestMaintenance }) => {
  return (
    <div className="bg-green-500 text-white rounded-lg p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold mb-1">Etorojah virtue</h3>
      <p className="text-green-100 text-xs sm:text-sm mb-3 sm:mb-4">Agent</p>
      
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
          <span className="font-semibold text-xs sm:text-sm">24th Jan 2025</span>
        </div>
      </div>
      
      <button
        onClick={onRequestMaintenance}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
      >
        Request for maintenance
      </button>
    </div>
  );
};

export default AgentCard;