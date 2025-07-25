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
  user: {
    type: string;
    id: number;
    attributes: {
  name: string;
      email: string;
      tenant_number: string;
  phone: string;
      marital_status: string;
      gender: string | null;
      nationality: string | null;
      occupation: string | null;
      income: string | null;
      id_number: string | null;
      id_type: string | null;
      id_front_image: string | null;
      id_back_image: string | null;
      user_image: string | null;
      property_unit_id: string;
      rent_start: string;
      rent_end: string;
      is_active: string;
      created_at: string;
      updated_at: string;
    };
    relationships: {
      unit: {
        type: string;
        id: number;
        attributes: {
          name: string;
          description: string | null;
          rent_amount: string;
          rent_frequency: string;
          is_occupied: string;
          image: string | null;
          video: string | null;
          agreement_file: string | null;
          payment_receipt: string | null;
          bed_room: string;
          bath_room: string;
          parking: boolean;
          security: boolean;
          water: boolean;
          electricity: boolean;
          internet: boolean;
          tv: boolean;
          created_at: string;
          updated_at: string;
        };
        relationships: {
          property: {
            type: string;
            id: number;
            attributes: {
              title: string;
              description: string;
              address: string;
              city: string;
              state: string;
              price: string;
              is_available: boolean;
              rent_price: string | null;
              rent_frequency: string | null;
              image: string;
              video: string | null;
              status: string;
              property_type: string;
              property_category: string;
              created_at: string;
              updated_at: string;
            };
            relationships: {
              files: Array<{
                type: string;
                id: number;
                attributes: {
                  name: string;
                  path: string;
                  is_main: string;
                  order: string;
                  created_at: string;
                  updated_at: string;
                };
              }>;
            };
            links: {
              self: string;
            };
          };
        };
      };
    };
  };
  property_apartment: {
    type: string;
    id: number;
    attributes: {
      name: string;
      description: string | null;
      rent_amount: string;
      rent_frequency: string;
      is_occupied: string;
      image: string | null;
      video: string | null;
      agreement_file: string | null;
      payment_receipt: string | null;
      bed_room: string;
      bath_room: string;
      parking: boolean;
      security: boolean;
      water: boolean;
      electricity: boolean;
      internet: boolean;
      tv: boolean;
      created_at: string;
      updated_at: string;
    };
    relationships: {
      property: {
        type: string;
        id: number;
        attributes: {
          title: string;
    description: string;
          address: string;
          city: string;
          state: string;
          price: string;
          is_available: boolean;
          rent_price: string | null;
          rent_frequency: string | null;
    image: string;
          video: string | null;
          status: string;
          property_type: string;
          property_category: string;
          created_at: string;
          updated_at: string;
        };
        relationships: {
          files: Array<{
            type: string;
            id: number;
            attributes: {
              name: string;
              path: string;
              is_main: string;
              order: string;
              created_at: string;
              updated_at: string;
            };
          }>;
        };
        links: {
          self: string;
        };
      };
    };
  };
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