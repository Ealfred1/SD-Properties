# Saint Davies Property Management Platform

A comprehensive property management system built with React, TypeScript, and Tailwind CSS, featuring role-based access control and responsive design.

## 🏢 Overview

The Saint Davies Property Management Platform is a modern web application designed to streamline property management operations for landlords, property managers, agents, and tenants. The system provides different levels of access and functionality based on user roles, ensuring secure and efficient property management.

## 🚀 Features

### Core Functionality
- **Property Management**: Create, view, edit, and manage properties
- **Tenant Management**: Handle tenant information, leases, and communications
- **Maintenance Tracking**: Submit, assign, and track maintenance requests
- **Financial Management**: Monitor rent payments, arrears, and financial reports
- **Hotel Booking System**: Integrated short-term rental management
- **User Management**: Invite and manage users with role-based permissions
- **Analytics Dashboard**: Comprehensive overview of property performance
- **Car Hire System**: Vehicle rental management and booking
- **Tenant Portal**: Simplified access for tenants with unique ID/passcode
- **View-Only Access**: Invitation-based access for external stakeholders

### Technical Features
- **Role-Based Access Control (RBAC)**: Secure permission system
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Real-time Updates**: Dynamic content updates and notifications
- **Document Management**: Upload and manage property documents
- **Multi-property Support**: Handle multiple properties from one dashboard

## 👥 User Roles & Permissions

### 1. Landlord (Full Access)
**Email**: `landlord@saintdavies.com`
**Password**: `password123`

**Permissions**:
- ✅ View, create, edit, delete properties
- ✅ Manage property access and assignments
- ✅ View, create, edit, remove tenants
- ✅ Access tenant documents and information
- ✅ View financials, manage rent, process payments
- ✅ Generate financial reports and analytics
- ✅ View, create, assign, complete maintenance requests
- ✅ Manage users and send invitations
- ✅ View user activity and system analytics
- ✅ Export data and generate reports

### 2. Property Manager
**Email**: `manager@saintdavies.com`
**Password**: `password123`

**Permissions**:
- ✅ View and edit assigned properties
- ✅ Manage property access for assigned properties
- ✅ View, create, edit tenants for assigned properties
- ✅ Access tenant documents
- ✅ View financials and manage rent for assigned properties
- ✅ Generate reports for assigned properties
- ✅ Full maintenance management for assigned properties
- ✅ Invite users for assigned properties
- ✅ View analytics for assigned properties

### 3. Agent
**Email**: `agent@saintdavies.com`
**Password**: `password123`

**Permissions**:
- ✅ View and edit assigned properties
- ✅ View, create, edit tenants for assigned properties
- ✅ View financial information for assigned properties
- ✅ View and create maintenance requests
- ✅ Access basic dashboard features

### 4. Tenant
**Email**: `tenant@saintdavies.com`
**Password**: `password123`
**Tenant ID**: `TENANT001`
**Passcode**: `1234`

**Permissions**:
- ✅ View own property information
- ✅ View and create maintenance requests for own property
- ✅ Access basic dashboard with own property data
- ❌ Cannot access other properties or tenant information
- ❌ Cannot manage financial or administrative functions

### 5. Admin (System Administrator)
**Permissions**: Same as Landlord plus system-wide administrative access

### 6. View-Only Landlord
**Invitation Token**: `VIEW_ONLY_TOKEN_123`

**Permissions**:
- ✅ View all properties (read-only)
- ✅ Download documents and agreements
- ✅ View tenant information and maintenance history
- ❌ Cannot edit, create, or delete anything
- ❌ No management capabilities
## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API
- **Authentication**: Custom JWT-like system with localStorage
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Mobile Phones**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px and above

### Mobile Features
- Collapsible navigation menu
- Touch-friendly interface elements
- Optimized layouts for small screens
- Swipe gestures support
- Mobile-optimized forms and modals

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd saint-davies-property-management
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎯 Getting Started

### Demo Accounts
Use these credentials to explore different user roles:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| Landlord | `landlord@saintdavies.com` | `password123` | Full Access |
| Property Manager | `manager@saintdavies.com` | `password123` | Multi-property Management |
| Agent | `agent@saintdavies.com` | `password123` | Limited Property Access |
| Tenant | `tenant@saintdavies.com` | `password123` | Own Property Only |

### First Time Setup
1. Visit the application URL
2. Click through the welcome screens
3. Use one of the demo accounts to log in
4. Explore the dashboard based on your role

## 📋 Application Flow

### Authentication Flow
1. **Welcome Screen**: Select flat/property
2. **Passcode Screen**: Enter property-specific passcode
3. **Account Type Selection**: Choose account type
4. **Login Screen**: Enter credentials
5. **Dashboard**: Role-based dashboard access

### Tenant Access Flow (Simplified)
1. **Tenant Welcome**: Enter tenant ID
2. **Tenant Passcode**: Enter flat-specific passcode
3. **Tenant Dashboard**: Direct access to personal property information

### View-Only Access Flow
1. **Account Type**: Select "Invited by a user"
2. **Invitation Link**: Enter invitation token
3. **View-Only Dashboard**: Browse properties without management capabilities

### Dashboard Navigation
- **Sidebar Navigation**: Role-based menu items
- **Mobile Navigation**: Collapsible menu for mobile devices
- **Protected Routes**: Content restricted by permissions
- **User Profile**: Display current user info and role

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── modals/          # Modal components
│   └── shared/          # Shared/common components
├── contexts/            # React Context providers
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── styles/              # CSS and styling files
```

### Key Components

#### Authentication
- `LoginScreen.tsx` - User login interface
- `AuthContext.tsx` - Authentication state management
- `ProtectedRoute.tsx` - Route protection based on permissions

#### Dashboard
- `EnhancedDashboardLayout.tsx` - Main dashboard layout
- `RoleBasedNavigation.tsx` - Dynamic navigation based on user role
- `DashboardOverview.tsx` - Main dashboard content

#### Property Management
- `PropertiesPage.tsx` - Property listing and management
- `PropertyDetailPage.tsx` - Individual property details
- `TenantDetailPage.tsx` - Tenant information and management

#### Maintenance
- `MaintenancePage.tsx` - Maintenance request management
- `MaintenanceSection.tsx` - Maintenance overview component

#### User Management
- `UserManagementPage.tsx` - User invitation and management
- `SignupModal.tsx` - User registration modal

#### Hotel & Car Systems
- `HotelBookingSystem.tsx` - Hotel booking and room management
- `CarHireSystem.tsx` - Car rental and vehicle management

#### Tenant Portal
- `TenantWelcomeScreen.tsx` - Tenant ID entry
- `TenantPasscodeScreen.tsx` - Passcode verification
- `TenantDashboard.tsx` - Simplified tenant dashboard
- `MaintenanceRequestModal.tsx` - Maintenance request submission

#### View-Only Access
- `InvitationLinkScreen.tsx` - Invitation token entry
- `ViewOnlyDashboard.tsx` - Read-only property overview
- `ViewOnlyPropertyDetail.tsx` - Detailed property view

## 🔐 Security Features

### Role-Based Access Control
- **Permission System**: Granular permissions for different actions
- **Route Protection**: Automatic redirection for unauthorized access
- **Data Filtering**: Users only see data they have permission to access
- **Session Management**: Secure session handling with localStorage

### Data Protection
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: Safe rendering of user content
- **CSRF Protection**: Token-based request validation
- **Secure Authentication**: Encrypted password storage (in production)

## 🎨 Design System

### Color Palette
- **Primary Green**: `#10B981` (Emerald-500)
- **Secondary Yellow**: `#F59E0B` (Amber-500)
- **Gray Scale**: Various shades for text and backgrounds
- **Status Colors**: Red for errors, Blue for information

### Typography
- **Font Family**: System fonts (Inter, SF Pro, etc.)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Font Sizes**: Responsive scaling from 12px to 48px

### Spacing System
- **Base Unit**: 4px (0.25rem)
- **Common Spacing**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## 📊 Features by Role

### Landlord Dashboard
- Property portfolio overview
- Financial analytics and reports
- Tenant management across all properties
- Maintenance request oversight
- User management and invitations
- System-wide analytics

### Property Manager Dashboard
- Assigned property management
- Tenant relations for managed properties
- Maintenance coordination
- Financial reporting for managed properties
- Limited user management

### Agent Dashboard
- Assigned property details
- Tenant interaction tools
- Maintenance request creation
- Basic financial overview
- Lead management tools

### Tenant Dashboard
- Personal property information
- Maintenance request submission
- Payment history and receipts
- Lease document access
- Communication with property management

### Hotel Booking System
- Room creation and management
- Booking process with payment integration
- Multiple payment methods (card/transfer)
- Receipt generation with QR codes
- Room categorization (Standard, Deluxe, Superior)

### Car Hire System
- Vehicle upload and management
- Car details with specifications
- Agent contact information
- Document and video uploads
- Rental rate management

### Tenant Portal Features
- **Simplified Access**: No email/password required
- **Unique ID System**: Tenant ID + passcode authentication
- **Personal Dashboard**: Property-specific information only
- **Maintenance Requests**: Submit with photo attachments
- **Document Downloads**: Access agreements and receipts
- **Secure Access**: Restricted to assigned property only

### View-Only Access Features
- **Invitation-Based**: Secure token-based access
- **Read-Only Mode**: Cannot modify any data
- **Property Overview**: View all properties and details
- **Document Access**: Download agreements and receipts
- **Maintenance History**: View all maintenance records

## 🔄 API Integration (Future Enhancement)

The application is designed to easily integrate with backend APIs:

### Planned Endpoints
- `POST /auth/login` - User authentication
- `POST /auth/tenant` - Tenant authentication
- `POST /auth/invitation` - Invitation-based authentication
- `GET /properties` - Fetch user properties
- `GET /tenants` - Fetch tenant information
- `POST /maintenance` - Create maintenance requests
- `GET /financials` - Fetch financial data
- `POST /hotel/booking` - Hotel booking creation
- `POST /car/rental` - Car rental booking
- `GET /documents/{id}` - Secure document download

### Data Models
- User model with role and permissions
- Property model with details and relationships
- Tenant model with lease information
- Maintenance model with request tracking
- Financial model with payment records
- Hotel booking model with payment details
- Car rental model with vehicle specifications
- Invitation model with access tokens

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login with different user roles
- [ ] Test tenant access with ID/passcode
- [ ] Test view-only access with invitation token
- [ ] Navigate through role-specific menus
- [ ] Test responsive design on mobile devices
- [ ] Verify permission-based content access
- [ ] Test form submissions and validations
- [ ] Check modal functionality
- [ ] Verify logout functionality
- [ ] Test hotel booking process
- [ ] Test car hire system
- [ ] Test maintenance request submission
- [ ] Test document downloads

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Environment Variables
```env
VITE_API_URL=your_api_url
VITE_APP_NAME=Saint Davies Properties
```

### Deployment Platforms
- **Netlify**: Automatic deployment from Git
- **Vercel**: Zero-config deployment
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repositories

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Implement responsive design
4. Add proper error handling
5. Write clear component documentation
6. Test across different user roles

### Code Style
- Use functional components with hooks
- Implement proper TypeScript typing
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic

## 📞 Support

For technical support or questions:
- **Email**: support@saintdavies.com
- **Documentation**: This README file
- **Issues**: GitHub Issues (if applicable)

## 📄 License

This project is proprietary software owned by Saint Davies Properties.

---

**Built with ❤️ by ALBANNY TECHNOLOGIES**

*Last Updated: January 2025*