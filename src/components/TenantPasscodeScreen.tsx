import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HeroSection from './HeroSection';

interface TenantPasscodeScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const TenantPasscodeScreen: React.FC<TenantPasscodeScreenProps> = ({ onNext, onBack }) => {
  const { tenantLogin, isLoading } = useAuth();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (passcode.trim()) {
      console.log('Attempting tenant login with passcode:', passcode);
      const success = await tenantLogin('TENANT001', passcode.trim());
      if (success) {
        console.log('Tenant login successful');
        onNext();
      } else {
        console.log('Tenant login failed');
        setError('Invalid passcode. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 order-2 lg:order-1">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Enter flat pass code
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              To access please enter your flat passcode
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter passcode"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              {isLoading ? 'Verifying...' : 'Next'}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-3 sm:p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-xs sm:text-sm font-semibold text-yellow-900 mb-2">Demo Tenant Access</h3>
            <div className="text-xs text-yellow-800">
              <div>Tenant ID: TENANT001</div>
              <div>Passcode: 1234</div>
            </div>
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

export default TenantPasscodeScreen;