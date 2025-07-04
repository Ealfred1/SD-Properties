export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  properties?: string[]; // Property IDs user has access to
  createdAt: string;
  lastLogin?: string;
}

export type UserRole = 'landlord' | 'agent' | 'tenant' | 'property_manager' | 'admin';

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
  | 'export_data';

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
    'view_properties',
    'view_maintenance', 'create_maintenance',
    'view_dashboard'
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