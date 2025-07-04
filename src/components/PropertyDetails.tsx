import React from 'react';
import { Home, Bath, Download } from 'lucide-react';

const PropertyDetails: React.FC = () => {
  return (
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
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">2 bedroom flat</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Bath className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">2 bathroom</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Description</h3>
        <div className="text-gray-600 space-y-2 text-xs sm:text-sm leading-relaxed max-h-48 sm:max-h-none overflow-y-auto">
          <p>quelyejeskinrlngjeroyfmrguregrygg erev ervcurv fd vgve revs vev</p>
          <p>affgjpref etef errerf o rejeog orgagg rgjrgeg gg g gqlgqrg gqrg gqrg cqrg geqrgjrg gqrg qgeqrgjrg gqrg qgqrgjrg gqrg qgqrgjrg grgqrg</p>
          <p>fw fgvwve kggl gee gqrg a gqrgjrggrelskimfnrvjero fmrguregrygg erev ervcurv fd vgve revs vev</p>
          <p>affgjpref etef errerf o rejeog orgagg rgjrgeg gg g gqlgqrg gqrg qgeqrgjrg gqrg qgqrgjrg gqrg qgqrgjrg gqrg qgqrgjrg grgqrg</p>
          <p>fw fgvwve kggl gee gqrg a gqrgjrggrelskimfnrvjero fmrguregrygg erev ervcurv fd vgve revs vev</p>
          <p>affgjpref etef errerf o rejeog orgagg rgjrgeg gg g gqlgqrg gqrg qgeqrgjrg gqrg qgqrgjrg gqrg qgqrgjrg gqrg qgqrgjrg grgqrg</p>
          <p>fw fgvwve kggl gee gqrg a gqrgjrggret</p>
        </div>
      </div>

      {/* Documents */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
          <span className="text-gray-700 text-sm sm:text-base">Tenancy agreement</span>
          <Download className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 cursor-pointer hover:text-yellow-700" />
        </div>
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
          <span className="text-gray-700 text-sm sm:text-base">Rent receipt</span>
          <Download className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 cursor-pointer hover:text-yellow-700" />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;