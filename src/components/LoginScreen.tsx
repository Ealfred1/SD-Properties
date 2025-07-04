import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import HeroSection from './HeroSection';

interface LoginScreenProps {
  onSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccess }) => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(formData.email, formData.password);
    if (success) {
      onSuccess();
    } else {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const demoAccounts = [
    { email: 'landlord@saintdavies.com', role: 'Landlord', description: 'Full access to all properties and features' },
    { email: 'agent@saintdavies.com', role: 'Agent', description: 'Manage assigned properties and tenants' },
    { email: 'tenant@saintdavies.com', role: 'Tenant', description: 'View own property and submit maintenance requests' },
    { email: 'manager@saintdavies.com', role: 'Property Manager', description: 'Manage multiple properties and operations' }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 order-2 lg:order-1">
        <div className="w-full max-w-md space-y-4 sm:space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Sign in to access your property management dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base pr-10 sm:pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2 sm:mb-3">Demo Accounts (Password: password123)</h3>
            <div className="space-y-1 sm:space-y-2">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => setFormData({ email: account.email, password: 'password123' })}
                  className="w-full text-left p-2 hover:bg-blue-100 rounded text-xs transition-colors"
                >
                  <div className="font-medium text-blue-900">{account.role}</div>
                  <div className="text-blue-700 truncate">{account.email}</div>
                  <div className="text-blue-600 hidden sm:block">{account.description}</div>
                </button>
              ))}
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

export default LoginScreen;