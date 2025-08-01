import React, { useState } from 'react';
import HeroSection from './HeroSection';
import { useNavigate } from 'react-router-dom';

interface TenantWelcomeScreenProps {
  onNext: (tenantId: string) => void;
}

const TenantWelcomeScreen: React.FC<TenantWelcomeScreenProps> = ({ onNext }) => {
  const [tenantId, setTenantId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tenantId.trim()) {
      localStorage.setItem('pendingTenantId', tenantId.trim());
      onNext(tenantId.trim());
      navigate('/tenant/passcode');
    }
  };

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
              To access please enter your tenant ID
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenant ID
              </label>
              <input
                type="text"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your tenant ID"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              Next
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-3 sm:p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-xs sm:text-sm font-semibold text-yellow-900 mb-2">Demo Tenant Access</h3>
            <div className="text-xs text-yellow-800">
              <div>Tenant ID: TENANT001</div>
              <div>Access: Flat 1 only</div>
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

export default TenantWelcomeScreen;