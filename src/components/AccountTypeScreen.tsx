import React from 'react';
import { ChevronRight } from 'lucide-react';
import HeroSection from './HeroSection';

interface AccountTypeScreenProps {
  onNext: (accountType: string) => void;
}

const AccountTypeScreen: React.FC<AccountTypeScreenProps> = ({ onNext }) => {
  const accountTypes = [
    {
      id: 'multi',
      title: 'For multi properties',
      description: 'Search from thousands of royalty-free',
    },
    {
      id: 'single',
      title: 'For a single property',
      description: 'Search from thousands of royalty-free',
    },
    {
      id: 'invitation',
      title: 'Invited by a user',
      description: 'Search from thousands of royalty-free',
    },
    {
      id: 'tenant',
      title: 'Tenant Access',
      description: 'Direct access with tenant ID',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 order-2 lg:order-1">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Choose a type of account
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              To access our platform please login first
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {accountTypes.map((type, index) => (
              <button
                key={index}
                onClick={() => onNext(type.id)}
                className="w-full p-4 sm:p-6 bg-white border border-gray-200 rounded-lg hover:border-yellow-500 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      {type.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {type.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-yellow-500 transition-colors flex-shrink-0 ml-2" />
                </div>
              </button>
            ))}
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

export default AccountTypeScreen;