import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import WelcomeScreen from './components/WelcomeScreen';
import PasscodeScreen from './components/PasscodeScreen';
import AccountTypeScreen from './components/AccountTypeScreen';
import LoginScreen from './components/LoginScreen';
import EnhancedDashboardLayout from './components/EnhancedDashboardLayout';
import SignupModal from './components/SignupModal';

type Screen = 'welcome' | 'passcode' | 'accountType' | 'login' | 'dashboard';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState('Flat 1');

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">Loading...</div>
        </div>
      </div>
    );
  }

  // If user is authenticated, show dashboard
  if (user) {
    return <EnhancedDashboardLayout />;
  }

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            selectedFlat={selectedFlat}
            onFlatChange={setSelectedFlat}
            onNext={() => handleScreenChange('passcode')}
          />
        );
      case 'passcode':
        return (
          <PasscodeScreen
            onNext={() => handleScreenChange('accountType')}
            onBack={() => handleScreenChange('welcome')}
          />
        );
      case 'accountType':
        return (
          <AccountTypeScreen
            onNext={() => handleScreenChange('login')}
            onBack={() => handleScreenChange('passcode')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onSuccess={() => handleScreenChange('dashboard')}
          />
        );
      default:
        return (
          <WelcomeScreen
            selectedFlat={selectedFlat}
            onFlatChange={setSelectedFlat}
            onNext={() => handleScreenChange('passcode')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentScreen()}
      
      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          selectedFlat={selectedFlat}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;