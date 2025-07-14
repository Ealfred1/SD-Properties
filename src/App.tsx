import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import PasscodeScreen from './components/PasscodeScreen';
import AccountTypeScreen from './components/AccountTypeScreen';
import LoginScreen from './components/LoginScreen';
import TenantWelcomeScreen from './components/TenantWelcomeScreen';
import TenantPasscodeScreen from './components/TenantPasscodeScreen';
import InvitationLinkScreen from './components/InvitationLinkScreen';
import EnhancedDashboardLayout from './components/EnhancedDashboardLayout';
import TenantDashboard from './components/TenantDashboard';
import ViewOnlyDashboard from './components/ViewOnlyDashboard';

function RequireAuth({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user, tenantData, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">Loading...</div>
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/account-type" replace />;
  if (role && user.role !== role) return <Navigate to="/account-type" replace />;
  if (role === 'tenant' && !tenantData) return <Navigate to="/tenant" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/account-type" replace />} />
      <Route path="/account-type" element={<AccountTypeScreen onNext={(type) => {
        if (type === 'tenant') navigate('/tenant');
        else if (type === 'invitation') navigate('/invitation');
        else navigate('/login');
      }} onBack={() => {}} />} />
      <Route path="/login" element={<LoginScreen onSuccess={() => {}} />} />
      <Route path="/tenant" element={<TenantWelcomeScreen onNext={() => navigate('/tenant/passcode')} />} />
      <Route path="/tenant/passcode" element={<TenantPasscodeScreen onNext={() => {}} onBack={() => navigate('/tenant')} />} />
      <Route path="/invitation" element={<InvitationLinkScreen onNext={() => {}} />} />
      <Route path="/tenant/dashboard" element={
        <RequireAuth role="tenant">
          <TenantDashboard />
        </RequireAuth>
      } />
      <Route path="/view-only" element={
        <RequireAuth role="view_only_landlord">
          <ViewOnlyDashboard />
        </RequireAuth>
      } />
      <Route path="/dashboard/*" element={
        <RequireAuth>
          <EnhancedDashboardLayout />
        </RequireAuth>
      } />
      <Route path="*" element={<Navigate to="/account-type" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;