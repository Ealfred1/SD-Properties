import React, { useState } from 'react';
import { UserPlus, Mail, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

const UserManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [showInviteModal, setShowInviteModal] = useState(false);

  const users = [
    { id: '1', name: 'John Davies', email: 'landlord@saintdavies.com', role: 'Landlord', status: 'Active', lastLogin: '2 hours ago' },
    { id: '2', name: 'Etorojah Virtue', email: 'agent@saintdavies.com', role: 'Agent', status: 'Active', lastLogin: '1 day ago' },
    { id: '3', name: 'Virtue Andrew', email: 'tenant@saintdavies.com', role: 'Tenant', status: 'Active', lastLogin: '3 days ago' },
    { id: '4', name: 'Property Manager', email: 'manager@saintdavies.com', role: 'Property Manager', status: 'Active', lastLogin: '5 hours ago' }
  ];

  return (
    <ProtectedRoute requiredPermission="manage_users">
      <div className="flex-1 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <p className="text-gray-600 text-sm mt-1">Manage users and their permissions</p>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="mt-4 sm:mt-0 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Invite User</span>
            </button>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userItem) => (
                  <tr key={userItem.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{userItem.name}</div>
                        <div className="text-sm text-gray-600">{userItem.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {userItem.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {userItem.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{userItem.lastLogin}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Mail className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invite User Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Invite New User</h3>
                <p className="text-sm text-gray-600 mt-1">Send an invitation to join the platform</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="user@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="tenant">Tenant</option>
                    <option value="agent">Agent</option>
                    <option value="property_manager">Property Manager</option>
                    {user?.role === 'landlord' && <option value="landlord">Landlord</option>}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Properties Access</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {['Flat 1', 'Flat 2', 'Flat 3', 'Flat 4', 'Flat 5'].map((property) => (
                      <label key={property} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <span className="ml-2 text-sm text-gray-700">{property}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex space-x-3">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default UserManagementPage;