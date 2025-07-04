import React from 'react';
import { ChevronDown } from 'lucide-react';
import HeroSection from './HeroSection';

interface WelcomeScreenProps {
  selectedFlat: string;
  onFlatChange: (flat: string) => void;
  onNext: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  selectedFlat,
  onFlatChange,
  onNext,
}) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 order-2 lg:order-1">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Hello, Welcome
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              To access please select a flat
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="relative">
              <select
                value={selectedFlat}
                onChange={(e) => onFlatChange(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
              >
                <option value="Flat 1">Flat 1</option>
                <option value="Flat 2">Flat 2</option>
                <option value="Flat 3">Flat 3</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <button
              onClick={onNext}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Hero */}
      <div className="w-full lg:w-1/2 order-1 lg:order-2">
        <HeroSection />
      </div>
    </div>
  );
};

export default WelcomeScreen;