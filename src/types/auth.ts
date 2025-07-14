export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  properties?: string[]; // Property IDs user has access to
  tenantId?: string; // For tenant-specific access
  invitationToken?: string; // For invitation-based access
  createdAt: string;
  lastLogin?: string;
}

export type UserRole = 'landlord' | 'agent' | 'tenant' | 'property_manager' | 'admin' | 'view_only_landlord';

export type Permission = 
  // Property permissions
  | 'view_properties'
  | 'create_properties'
  | 'edit_properties'
  | 'delete_properties'
  | 'manage_property_access'
  
  // Tenant permissions
  | 'view_tenants'
  | 'create_tenants'
  | 'edit_tenants'
  | 'remove_tenants'
  | 'view_tenant_documents'
  
  // Financial permissions
  | 'view_financials'
  | 'manage_rent'
  | 'view_payments'
  | 'process_payments'
  | 'generate_reports'
  
  // Maintenance permissions
  | 'view_maintenance'
  | 'create_maintenance'
  | 'assign_maintenance'
  | 'complete_maintenance'
  
  // User management
  | 'manage_users'
  | 'invite_users'
  | 'view_user_activity'
  
  // Dashboard access
  | 'view_dashboard'
  | 'view_analytics'
  | 'export_data'
  
  // Tenant-specific permissions
  | 'view_own_property'
  | 'request_maintenance'
  | 'download_documents'
  | 'send_messages';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  landlord: [
    'view_properties', 'create_properties', 'edit_properties', 'delete_properties', 'manage_property_access',
    'view_tenants', 'create_tenants', 'edit_tenants', 'remove_tenants', 'view_tenant_documents',
    'view_financials', 'manage_rent', 'view_payments', 'process_payments', 'generate_reports',
    'view_maintenance', 'create_maintenance', 'assign_maintenance', 'complete_maintenance',
    'manage_users', 'invite_users', 'view_user_activity',
    'view_dashboard', 'view_analytics', 'export_data'
  ],
  property_manager: [
    'view_properties', 'edit_properties', 'manage_property_access',
    'view_tenants', 'create_tenants', 'edit_tenants', 'view_tenant_documents',
    'view_financials', 'manage_rent', 'view_payments', 'generate_reports',
    'view_maintenance', 'create_maintenance', 'assign_maintenance', 'complete_maintenance',
    'invite_users', 'view_user_activity',
    'view_dashboard', 'view_analytics', 'export_data'
  ],
  agent: [
    'view_properties', 'edit_properties',
    'view_tenants', 'create_tenants', 'edit_tenants',
    'view_financials', 'view_payments',
    'view_maintenance', 'create_maintenance',
    'view_dashboard'
  ],
  tenant: [
    'view_own_property',
    'view_maintenance', 'request_maintenance',
    'download_documents', 'send_messages',
    'view_dashboard'
  ],
  view_only_landlord: [
    'view_properties',
    'view_tenants', 'view_tenant_documents',
    'view_financials', 'view_payments',
    'view_maintenance',
    'view_dashboard', 'download_documents'
  ],
  admin: [
    'view_properties', 'create_properties', 'edit_properties', 'delete_properties', 'manage_property_access',
    'view_tenants', 'create_tenants', 'edit_tenants', 'remove_tenants', 'view_tenant_documents',
    'view_financials', 'manage_rent', 'view_payments', 'process_payments', 'generate_reports',
    'view_maintenance', 'create_maintenance', 'assign_maintenance', 'complete_maintenance',
    'manage_users', 'invite_users', 'view_user_activity',
    'view_dashboard', 'view_analytics', 'export_data'
  ]
};

export interface TenantData {
  id: string;
  name: string;
  phone: string;
  email: string;
  flatNumber: string;
  rentAmount: number;
  expiryDate: string;
  lastPaymentDate: string;
  propertyDetails: {
    bedrooms: number;
    bathrooms: number;
    description: string;
    image: string;
    address?: string;
    floor?: string;
  };
  maintenanceHistory: MaintenanceRecord[];
  paymentHistory: PaymentRecord[];
  documents: Document[];
  rentStartDate: string;
  rentExpiryDate: string;
  agentName?: string;
  agentPhone?: string;
  maintenance?: { title: string; date: string }[];
}

export interface MaintenanceRecord {
  id: string;
  detail: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'in_progress';
  receipt?: string;
}

export interface PaymentRecord {
  id: string;
  detail: string;
  amount: number;
  date: string;
  receipt: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'tenancy_agreement' | 'rent_receipt' | 'maintenance_record';
  url: string;
  date: string;
}

export interface PropertyShareLink {
  id: string;
  propertyId: string;
  token: string;
  expiresAt: string;
  createdBy: string;
  accessType: 'view_only' | 'tenant_access';
}