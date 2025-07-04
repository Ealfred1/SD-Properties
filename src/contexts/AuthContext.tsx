import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Permission, ROLE_PERMISSIONS } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'landlord@saintdavies.com',
    name: 'John Davies',
    role: 'landlord',
    permissions: ROLE_PERMISSIONS.landlord,
    properties: ['1', '2', '3', '4', '5'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'agent@saintdavies.com',
    name: 'Etorojah Virtue',
    role: 'agent',
    permissions: ROLE_PERMISSIONS.agent,
    properties: ['1', '2'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'tenant@saintdavies.com',
    name: 'Virtue Andrew',
    role: 'tenant',
    permissions: ROLE_PERMISSIONS.tenant,
    properties: ['1'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    email: 'manager@saintdavies.com',
    name: 'Property Manager',
    role: 'property_manager',
    permissions: ROLE_PERMISSIONS.property_manager,
    properties: ['1', '2', '3'],
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      const userWithLastLogin = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      };
      setUser(userWithLastLogin);
      localStorage.setItem('user', JSON.stringify(userWithLastLogin));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: Permission): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const value = {
    user,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};