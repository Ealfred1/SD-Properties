import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-80 lg:h-full bg-gradient-to-br from-purple-600 to-purple-800 relative overflow-hidden">
      {/* Dotted Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Saint Davies Logo */}
      <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <div>
            <div className="text-xs sm:text-sm">
              <span className="text-gray-900 font-bold">Saint </span>
              <span className="text-green-500 font-bold">Davies</span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Properties</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center">
          {/* Business Stats Card */}
          <div className="inline-block bg-yellow-500 text-black px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg mb-4 sm:mb-8 transform -rotate-12">
            <div className="text-2xl sm:text-3xl font-bold">48</div>
            <div className="text-xs sm:text-sm font-semibold">Business</div>
          </div>

          {/* Businessman Image Container */}
          <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop"
              alt="Professional businessman"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Properties Stats Card */}
          <div className="inline-block bg-white text-black px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg mt-4 sm:mt-8 transform rotate-12">
            <div className="text-2xl sm:text-3xl font-bold">170</div>
            <div className="text-xs sm:text-sm text-gray-600">Properties</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 text-center text-white text-xs sm:text-sm">
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 mb-2 sm:mb-4">
          <a href="#" className="hover:text-yellow-300 transition-colors">Terms and Conditions</a>
          <a href="#" className="hover:text-yellow-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-300 transition-colors">Contact Us</a>
        </div>
        <div className="opacity-75">
          © 2024 Saint Davies Properties. Made by <span className="font-semibold">ALBANNY TECHNOLOGIES</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;