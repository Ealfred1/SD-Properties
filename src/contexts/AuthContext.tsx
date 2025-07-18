import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Permission, ROLE_PERMISSIONS, TenantData } from '../types/auth';
import { apiRequest } from '../utils/api';

interface AuthContextType {
  user: User | null;
  tenantData: TenantData | null;
  login: (email: string, password: string) => Promise<boolean>;
  tenantLogin: (tenantId: string, passcode: string) => Promise<boolean>;
  invitationLogin: (invitationLink: string) => Promise<boolean>;
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
    tenantId: 'TENANT001',
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
  },
  {
    id: '5',
    email: 'viewonly@saintdavies.com',
    name: 'View Only Landlord',
    role: 'view_only_landlord',
    permissions: ROLE_PERMISSIONS.view_only_landlord,
    properties: ['1', '2', '3', '4', '5'],
    invitationToken: 'VIEW_ONLY_TOKEN_123',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Mock tenant data
const MOCK_TENANT_DATA: TenantData = {
  id: 'TENANT001',
  name: 'Virtue Andrew',
  phone: '08140435024',
  email: 'tenant@saintdavies.com',
  flatNumber: 'Flat 1',
  rentAmount: 526,
  expiryDate: '3rd Mar 2024',
  lastPaymentDate: '24th Jan 2025',
  rentStartDate: '24th Mar 2025',
  rentExpiryDate: '24th Mar 2025',
  propertyDetails: {
    bedrooms: 2,
    bathrooms: 2,
    description: 'Modern 2-bedroom apartment with excellent amenities',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    address: '55th deacon abel drive, itu rd, Akwa ibom',
    floor: '3rd story building'
  },
  maintenanceHistory: [
    { id: '1', detail: 'House Rent', amount: 23000, date: '20th Mar 2025', status: 'completed' },
    { id: '2', detail: 'House Rent', amount: 23000, date: '20th Mar 2025', status: 'completed' },
    { id: '3', detail: 'House Rent', amount: 23000, date: '20th Mar 2025', status: 'completed' }
  ],
  paymentHistory: [
    { id: '1', detail: 'Monthly Rent', amount: 526, date: '24th Jan 2025', receipt: 'receipt_001.pdf' }
  ],
  documents: [
    { id: '1', name: 'Tenancy Agreement', type: 'tenancy_agreement', url: '/documents/tenancy_agreement.pdf', date: '1st Jan 2024' },
    { id: '2', name: 'Rent Receipt', type: 'rent_receipt', url: '/documents/rent_receipt.pdf', date: '24th Jan 2025' }
  ],
  agentName: 'Etorojah Virtue',
  agentPhone: '08140435024',
  maintenance: [
    { title: 'Change toilet', date: '20th Mar 2025' },
    { title: 'Painting', date: '20th Mar 2025' },
    { title: 'Change socket', date: '20th Mar 2025' }
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenantData, setTenantData] = useState<TenantData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    const storedTenantData = localStorage.getItem('tenantData');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Normalize user if it's from API format
        const normalizedUser = parsedUser.attributes
          ? {
              id: parsedUser.id.toString(),
              email: parsedUser.attributes.email,
              name: parsedUser.attributes.name,
              role: parsedUser.attributes.role,
              permissions: ROLE_PERMISSIONS[parsedUser.attributes.role] || [],
              properties: [],
              createdAt: parsedUser.attributes.created_at,
            }
          : parsedUser;
        setUser(normalizedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    if (storedTenantData) {
      try {
        const parsedTenantData = JSON.parse(storedTenantData);
        console.log('Restored tenant data from localStorage:', parsedTenantData);
        setTenantData(parsedTenantData);
      } catch (error) {
        console.error('Error parsing stored tenant data:', error);
        localStorage.removeItem('tenantData');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await apiRequest('POST', '/auth/login', { email, password }, undefined, true);
      const user = res.data.user;
      const token = res.data.token;
      if (user && user.attributes && user.attributes.role === 'manager') {
        setUser({
          id: user.id.toString(),
          email: user.attributes.email,
          name: user.attributes.name,
          role: user.attributes.role,
          permissions: ROLE_PERMISSIONS.property_manager,
          properties: [],
          createdAt: user.attributes.created_at,
        });
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (err: any) {
      // Check for unverified email error
      if (err?.message && err.message.toLowerCase().includes('not verified')) {
        localStorage.setItem('pendingVerification', email);
        window.location.href = '/verify-email';
      }
      setIsLoading(false);
      return false;
    }
  };

  const tenantLogin = async (tenantId: string, passcode: string): Promise<boolean> => {
    setIsLoading(true);
    console.log('Tenant login attempt for:', tenantId, 'with passcode:', passcode);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if tenant ID and passcode are valid
      if (tenantId === 'TENANT001' && passcode === '1234') {
        const tenantUser: User = {
          id: 'tenant_' + tenantId,
          email: '',
          name: MOCK_TENANT_DATA.name,
          role: 'tenant',
          permissions: ROLE_PERMISSIONS.tenant,
          properties: ['1'],
          tenantId: tenantId,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        console.log('Tenant login successful, setting user:', tenantUser);
        console.log('Setting tenant data:', MOCK_TENANT_DATA);
        
        setUser(tenantUser);
        setTenantData(MOCK_TENANT_DATA);
        localStorage.setItem('user', JSON.stringify(tenantUser));
        localStorage.setItem('tenantData', JSON.stringify(MOCK_TENANT_DATA));
        setIsLoading(false);
        return true;
      }
      
      console.log('Tenant login failed - invalid credentials');
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Tenant login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const invitationLogin = async (invitationLink: string): Promise<boolean> => {
    setIsLoading(true);
    console.log('Invitation login attempt with:', invitationLink);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if invitation link is valid
      if (invitationLink === 'VIEW_ONLY_TOKEN_123') {
        const viewOnlyUser = MOCK_USERS.find(u => u.invitationToken === invitationLink);
        if (viewOnlyUser) {
          const userWithLastLogin = {
            ...viewOnlyUser,
            lastLogin: new Date().toISOString()
          };
          console.log('Invitation login successful, setting user:', userWithLastLogin);
          setUser(userWithLastLogin);
          localStorage.setItem('user', JSON.stringify(userWithLastLogin));
          setIsLoading(false);
          return true;
        }
      }
      
      console.log('Invitation login failed - invalid token');
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Invitation login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    setTenantData(null);
    localStorage.removeItem('user');
    localStorage.removeItem('tenantData');
  };

  const hasPermission = (permission: Permission): boolean => {
    const result = user?.permissions.includes(permission) || false;
    console.log(`Permission check for ${permission}:`, result);
    return result;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const value = {
    user,
    tenantData,
    login,
    tenantLogin,
    invitationLogin,
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