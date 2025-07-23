import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { apiRequestWithAuth } from '../utils/api';

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  property_unit_id: string;
  rent_start: string;
  rent_end?: string;
  [key: string]: any;
}

interface PropertyUnit {
  id: number;
  name: string;
  description?: string;
  rent_amount?: string;
  rent_frequency?: string;
  is_occupied?: string;
  [key: string]: any;
}

const TenantManagerPage: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [units, setUnits] = useState<PropertyUnit[]>([]);
  const [unitLoading, setUnitLoading] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    phone: '',
    marital_status: '',
    property_unit_id: '',
    rent_start: '',
    rent_end: '',
    password: '',
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [unitForm, setUnitForm] = useState({
    property_id: '',
    name: '',
    rent_amount: '',
    rent_frequency: '',
    is_occupied: '0',
  });
  const [unitAddLoading, setUnitAddLoading] = useState(false);
  const [unitAddError, setUnitAddError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    marital_status: '',
    property_unit_id: '',
    rent_start: '',
    rent_end: '',
    password: '',
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiRequestWithAuth('GET', '/manager/tenants');
        setTenants((res.data || []).map((t: any) => ({
          id: t.id,
          ...t.attributes,
        })));
      } catch (err: any) {
        setError(err?.message || 'Failed to load tenants.');
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  const fetchUnits = async () => {
    setUnitLoading(true);
    try {
      const res = await apiRequestWithAuth('GET', '/manager/property-units');
      setUnits((res.data || []).map((u: any) => ({ id: u.id, ...u.attributes })));
    } catch {}
    setUnitLoading(false);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    try {
      await apiRequestWithAuth('POST', '/manager/tenants/', addForm, false);
      setShowAddModal(false);
      setAddForm({ name: '', email: '', phone: '', marital_status: '', property_unit_id: '', rent_start: '', rent_end: '', password: '' });
      // Refresh tenants
      const res = await apiRequestWithAuth('GET', '/manager/tenants');
      setTenants((res.data || []).map((t: any) => ({ id: t.id, ...t.attributes })));
    } catch (err: any) {
      setAddError(err?.message || 'Failed to add tenant.');
    } finally {
      setAddLoading(false);
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUnitForm({ ...unitForm, [e.target.name]: e.target.value });
  };

  const handleAddUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnitAddLoading(true);
    setUnitAddError('');
    try {
      const res = await apiRequestWithAuth('POST', '/manager/property-units', unitForm, true);
      setShowUnitModal(false);
      setUnitForm({ property_id: '', name: '', rent_amount: '', rent_frequency: '', is_occupied: '0' });
      // Refresh units
      await fetchUnits();
    } catch (err: any) {
      setUnitAddError(err?.message || 'Failed to add unit.');
    } finally {
      setUnitAddLoading(false);
    }
  };

  const openEditModal = (tenant: Tenant) => {
    setEditForm({ ...tenant, id: tenant.id.toString(), password: '' });
    setShowEditModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    try {
      await apiRequestWithAuth('PUT', `/manager/tenants/${editForm.id}`, editForm, false);
      setShowEditModal(false);
      // Refresh tenants
      const res = await apiRequestWithAuth('GET', '/manager/tenants');
      setTenants((res.data || []).map((t: any) => ({ id: t.id, ...t.attributes })));
    } catch (err: any) {
      setEditError(err?.message || 'Failed to update tenant.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteTenant = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this tenant?')) return;
    setDeleteLoading(id);
    setDeleteError('');
    try {
      await apiRequestWithAuth('DELETE', `/manager/tenants/${id}`);
      // Refresh tenants
      const res = await apiRequestWithAuth('GET', '/manager/tenants');
      setTenants((res.data || []).map((t: any) => ({ id: t.id, ...t.attributes })));
    } catch (err: any) {
      setDeleteError(err?.message || 'Failed to delete tenant.');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Tenants</h2>
        {loading && <div className="text-gray-500">Loading tenants...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="space-y-4">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">{tenant.name}</div>
                <div className="text-xs text-gray-500">{tenant.email}</div>
                <div className="text-xs text-gray-500">Unit: {tenant.property_unit_id}</div>
                <div className="text-xs text-gray-500">Phone: {tenant.phone}</div>
                <div className="text-xs text-gray-500">Rent Start: {tenant.rent_start}</div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200"
                  onClick={() => openEditModal(tenant)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200"
                  onClick={() => handleDeleteTenant(tenant.id)}
                  disabled={deleteLoading === tenant.id}
                >
                  {deleteLoading === tenant.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
          {deleteError && <div className="text-red-600 mt-2">{deleteError}</div>}
        </div>
      </div>
      {/* Floating Add Button */}
      <button
        className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors z-50"
        onClick={() => { setShowAddModal(true); fetchUnits(); }}
        title="Add Tenant"
      >
        <Plus className="h-6 w-6" />
      </button>
      {/* Add Tenant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Add Tenant</h2>
            {addError && <div className="text-red-600 mb-2">{addError}</div>}
            <form onSubmit={handleAddTenant} className="space-y-3">
              <input type="text" name="name" value={addForm.name} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Name" required />
              <input type="email" name="email" value={addForm.email} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Email" required />
              <input type="text" name="phone" value={addForm.phone} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Phone" required />
              <input type="text" name="marital_status" value={addForm.marital_status} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Marital Status" />
              <select name="property_unit_id" value={addForm.property_unit_id} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Select Property Unit</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.name} (₦{unit.rent_amount})</option>
                ))}
              </select>
              <button type="button" className="text-blue-600 underline text-xs" onClick={() => setShowUnitModal(true)}>+ Add New Unit</button>
              <input type="date" name="rent_start" value={addForm.rent_start} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Rent Start" required />
              <input type="date" name="rent_end" value={addForm.rent_end} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Rent End" />
              <input type="password" name="password" value={addForm.password} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Password" required />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={addLoading} className="bg-green-500 text-white px-4 py-2 rounded">{addLoading ? 'Adding...' : 'Add Tenant'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add Property Unit Modal */}
      {showUnitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Add Property Unit</h2>
            {unitAddError && <div className="text-red-600 mb-2">{unitAddError}</div>}
            <form onSubmit={handleAddUnit} className="space-y-3">
              <input type="text" name="property_id" value={unitForm.property_id} onChange={handleUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Property ID" required />
              <input type="text" name="name" value={unitForm.name} onChange={handleUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Unit Name" required />
              <input type="number" name="rent_amount" value={unitForm.rent_amount} onChange={handleUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Rent Amount" required />
              <input type="text" name="rent_frequency" value={unitForm.rent_frequency} onChange={handleUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Rent Frequency (e.g. monthly)" required />
              <select name="is_occupied" value={unitForm.is_occupied} onChange={handleUnitChange} className="w-full px-4 py-2 border rounded">
                <option value="0">Not Occupied</option>
                <option value="1">Occupied</option>
              </select>
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowUnitModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={unitAddLoading} className="bg-green-500 text-white px-4 py-2 rounded">{unitAddLoading ? 'Adding...' : 'Add Unit'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Tenant Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Edit Tenant</h2>
            {editError && <div className="text-red-600 mb-2">{editError}</div>}
            <form onSubmit={handleEditTenant} className="space-y-3">
              <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Name" required />
              <input type="email" name="email" value={editForm.email} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Email" required />
              <input type="text" name="phone" value={editForm.phone} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Phone" required />
              <input type="text" name="marital_status" value={editForm.marital_status} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Marital Status" />
              <select name="property_unit_id" value={editForm.property_unit_id} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Select Property Unit</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.name} (₦{unit.rent_amount})</option>
                ))}
              </select>
              <input type="date" name="rent_start" value={editForm.rent_start} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Rent Start" required />
              <input type="date" name="rent_end" value={editForm.rent_end} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Rent End" />
              <input type="password" name="password" value={editForm.password} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Password (leave blank to keep current)" />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={editLoading} className="bg-green-500 text-white px-4 py-2 rounded">{editLoading ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantManagerPage; 