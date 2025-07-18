import React, { useState, useEffect } from 'react';
import { Home, Bath, Download, Edit, Trash2, Upload, ArrowLeft, Plus } from 'lucide-react';
import { apiRequestWithAuth } from '../utils/api';

interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  state: string;
  price: string;
  is_available: boolean;
  image?: string;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  [key: string]: any;
}

interface PropertyDetailPageProps {
  property: Property | null;
  onBack: () => void;
  onUpdate?: (property: Property) => void;
  onDelete?: (property: Property) => void;
  onRequestMaintenance?: (property: Property) => void;
  onUploadImages?: (property: Property) => void;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onUpdate,
  onDelete,
  onRequestMaintenance,
  onUploadImages,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [editData, setEditData] = useState(property || {});
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [maintenance, setMaintenance] = useState<any[]>([]);
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);
  const [maintenanceError, setMaintenanceError] = useState('');
  const [statusLoading, setStatusLoading] = useState<number | null>(null);
  const [units, setUnits] = useState<any[]>([]);
  const [unitLoading, setUnitLoading] = useState(false);
  const [unitError, setUnitError] = useState('');
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [unitForm, setUnitForm] = useState({
    name: '',
    rent_amount: '',
    rent_frequency: '',
    is_occupied: '0',
    property_id: property?.id?.toString() || '',
  });
  const [unitAddLoading, setUnitAddLoading] = useState(false);
  const [unitAddError, setUnitAddError] = useState('');
  const [showUnitImageModal, setShowUnitImageModal] = useState<number | null>(null);
  const [unitImageFiles, setUnitImageFiles] = useState<FileList | null>(null);
  const [unitImageLoading, setUnitImageLoading] = useState(false);
  const [unitImageError, setUnitImageError] = useState('');
  const [showEditUnitModal, setShowEditUnitModal] = useState<number | null>(null);
  const [editUnitForm, setEditUnitForm] = useState<any>({});
  const [editUnitLoading, setEditUnitLoading] = useState(false);
  const [editUnitError, setEditUnitError] = useState('');
  const [deleteUnitLoading, setDeleteUnitLoading] = useState<number | null>(null);
  const [deleteUnitError, setDeleteUnitError] = useState('');

  useEffect(() => {
    if (!property) return;
    const fetchMaintenance = async () => {
      setMaintenanceLoading(true);
      setMaintenanceError('');
      try {
        const res = await apiRequestWithAuth('GET', `/manager/maintenance-requests?property_id=${property.id}`);
        setMaintenance(res.data || []);
      } catch (err: unknown) {
        setMaintenanceError((err as any)?.message || 'Failed to load maintenance requests.');
      } finally {
        setMaintenanceLoading(false);
      }
    };
    fetchMaintenance();
    // Fetch property units for this property
    const fetchUnits = async () => {
      setUnitLoading(true);
      setUnitError('');
      try {
        const res = await apiRequestWithAuth('GET', `/manager/property-units?property_id=${property.id}`);
        setUnits(res.data || []);
      } catch (err: unknown) {
        setUnitError((err as any)?.message || 'Failed to load units.');
      } finally {
        setUnitLoading(false);
      }
    };
    fetchUnits();
  }, [property]);

  const handleChangeStatus = async (id: number, status: string) => {
    setStatusLoading(id);
    try {
      await apiRequestWithAuth('POST', '/manager/maintenance-requests/change-status', {
        maintenance_request_id: id,
        status,
      }, true);
      // Refresh maintenance list
      const res = await apiRequestWithAuth('GET', `/manager/maintenance-requests?property_id=${property?.id}`);
      setMaintenance(res.data || []);
    } catch (err: unknown) {
      setMaintenanceError((err as any)?.message || 'Failed to change status.');
    } finally {
      setStatusLoading(null);
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
      await apiRequestWithAuth('POST', '/manager/property-units', { ...unitForm, property_id: property?.id }, true);
      setShowAddUnitModal(false);
      setUnitForm({ name: '', rent_amount: '', rent_frequency: '', is_occupied: '0', property_id: property?.id?.toString() || '' });
      // Refresh units
      const res = await apiRequestWithAuth('GET', `/manager/property-units?property_id=${property?.id}`);
      setUnits(res.data || []);
    } catch (err: any) {
      setUnitAddError(err?.message || 'Failed to add unit.');
    } finally {
      setUnitAddLoading(false);
    }
  };

  const openEditUnitModal = (unit: any) => {
    setEditUnitForm({ ...unit });
    setShowEditUnitModal(unit.id);
  };

  const handleEditUnitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditUnitForm({ ...editUnitForm, [e.target.name]: e.target.value });
  };

  const handleEditUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditUnitLoading(true);
    setEditUnitError('');
    try {
      await apiRequestWithAuth('POST', `/manager/property-units/${editUnitForm.id}`, { ...editUnitForm, _method: 'put' }, true);
      setShowEditUnitModal(null);
      // Refresh units
      const res = await apiRequestWithAuth('GET', `/manager/property-units?property_id=${property?.id}`);
      setUnits(res.data || []);
    } catch (err: any) {
      setEditUnitError(err?.message || 'Failed to update unit.');
    } finally {
      setEditUnitLoading(false);
    }
  };

  const handleDeleteUnit = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this unit?')) return;
    setDeleteUnitLoading(id);
    setDeleteUnitError('');
    try {
      await apiRequestWithAuth('DELETE', `/manager/property-units/${id}`);
      // Refresh units
      const res = await apiRequestWithAuth('GET', `/manager/property-units?property_id=${property?.id}`);
      setUnits(res.data || []);
    } catch (err: any) {
      setDeleteUnitError(err?.message || 'Failed to delete unit.');
    } finally {
      setDeleteUnitLoading(null);
    }
  };

  const handleUnitImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitImageFiles || showUnitImageModal == null) return;
    setUnitImageLoading(true);
    setUnitImageError('');
    const formData = new FormData();
    Array.from(unitImageFiles).forEach((file) => formData.append('images[]', file));
    try {
      await apiRequestWithAuth('POST', `/manager/property-units/${showUnitImageModal}/images`, formData, true);
      setShowUnitImageModal(null);
      setUnitImageFiles(null);
      // Refresh units
      const res = await apiRequestWithAuth('GET', `/manager/property-units?property_id=${property?.id}`);
      setUnits(res.data || []);
    } catch (err: any) {
      setUnitImageError(err?.message || 'Failed to upload images.');
    } finally {
      setUnitImageLoading(false);
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading property details...</h2>
          <p className="text-gray-600">Please select a property.</p>
        </div>
      </div>
    );
  }

  // Update property handler
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiRequestWithAuth(
        'POST',
        `/manager/properties/${property.id}`,
        { ...editData, _method: 'PUT' },
        true
      );
      setShowEditModal(false);
      if (onUpdate) onUpdate({ ...property, ...editData });
    } catch (err: any) {
      setError(err?.message || 'Failed to update property.');
    } finally {
      setLoading(false);
    }
  };

  // Delete property handler
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    setLoading(true);
    setError('');
    try {
      await apiRequestWithAuth('DELETE', `/manager/properties/${property.id}`);
      if (onDelete) onDelete(property);
      onBack();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete property.');
    } finally {
      setLoading(false);
    }
  };

  // Upload images handler
  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFiles) return;
    setLoading(true);
    setError('');
    const formData = new FormData();
    Array.from(imageFiles).forEach((file) => formData.append('images[]', file));
    try {
      await apiRequestWithAuth(
        'POST',
        `/manager/properties/${property.id}/images`,
        formData,
        true
      );
      setShowImageModal(false);
      if (onUploadImages) onUploadImages(property);
    } catch (err: any) {
      setError(err?.message || 'Failed to upload images.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button onClick={onBack} className="mb-4 flex items-center text-gray-600 hover:text-green-600 text-sm">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Properties
        </button>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Property Details - Left Column */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              {/* Property Image */}
              <div className="mb-4 sm:mb-6">
                <img
                  src={property.image || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'}
                  alt={property.title}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
                />
              </div>
              {/* Property Info */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{property.title}</h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Home className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-sm sm:text-base">{property.bedrooms || 2} bedroom flat</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Bath className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-sm sm:text-base">{property.bathrooms || 2} bathroom</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button onClick={() => setShowEditModal(true)} className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium hover:bg-blue-200">
                    <Edit className="h-4 w-4 mr-1" /> Update
                  </button>
                  <button onClick={handleDelete} className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-medium hover:bg-red-200">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </button>
                  <button onClick={() => setShowImageModal(true)} className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs font-medium hover:bg-yellow-200">
                    <Upload className="h-4 w-4 mr-1" /> Upload Images
                  </button>
                  <button onClick={() => onRequestMaintenance && onRequestMaintenance(property)} className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium hover:bg-green-200">
                    Request Maintenance
                  </button>
                </div>
              </div>
              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Description</h3>
                <div className="text-gray-600 space-y-2 text-xs sm:text-sm leading-relaxed">
                  <p>{property.description || 'No description provided.'}</p>
                </div>
              </div>
              {/* Documents (stub) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700 text-sm sm:text-base">Tenancy agreement</span>
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition-colors">
                    <Download className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700 text-sm sm:text-base">Rent receipt</span>
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition-colors">
                    <Download className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            {/* Tenant Card (stub) */}
            <div className="bg-green-500 text-white rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-1">Tenant (stub)</h3>
              <p className="text-green-100 text-xs sm:text-sm mb-3 sm:mb-4">Tenant info here</p>
            </div>
            {/* Recent Maintenance (API) */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Maintenance Requests</h3>
              {maintenanceLoading && <div className="text-gray-500">Loading...</div>}
              {maintenanceError && <div className="text-red-600 mb-2">{maintenanceError}</div>}
              <div className="space-y-2 sm:space-y-3">
                {maintenance.length === 0 && !maintenanceLoading && <div className="text-gray-500">No maintenance requests.</div>}
                {maintenance.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b last:border-b-0">
                    <div>
                      <div className="text-gray-700 text-xs sm:text-sm font-semibold">{item.title || item.detail}</div>
                      <div className="text-xs text-gray-500">{item.date || item.created_at}</div>
                      <div className="text-xs text-gray-500">Status: <span className="font-semibold">{item.status}</span></div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex gap-2">
                      <select
                        value={item.status}
                        onChange={e => handleChangeStatus(item.id, e.target.value)}
                        disabled={statusLoading === item.id}
                        className="px-2 py-1 border rounded text-xs"
                      >
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {statusLoading === item.id && <span className="text-xs text-gray-400 ml-2">Updating...</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Apartment Units Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Apartment Units</h3>
                <button
                  className="bg-green-500 text-white rounded-full p-2 shadow hover:bg-green-600"
                  onClick={() => setShowAddUnitModal(true)}
                  title="Add Apartment Unit"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              {unitLoading && <div className="text-gray-500">Loading units...</div>}
              {unitError && <div className="text-red-600 mb-2">{unitError}</div>}
              <div className="space-y-2">
                {units.length === 0 && !unitLoading && <div className="text-gray-500">No units for this property.</div>}
                {units.map((unit) => (
                  <div key={unit.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-semibold text-gray-900">{unit.name}</div>
                      <div className="text-xs text-gray-500">Rent: ₦{unit.rent_amount} / {unit.rent_frequency}</div>
                      <div className="text-xs text-gray-500">Occupied: {unit.is_occupied === '1' ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium hover:bg-yellow-200"
                        onClick={() => setShowUnitImageModal(unit.id)}
                      >
                        Upload Images
                      </button>
                      <button
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200"
                        onClick={() => openEditUnitModal(unit)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200"
                        onClick={() => handleDeleteUnit(unit.id)}
                        disabled={deleteUnitLoading === unit.id}
                      >
                        {deleteUnitLoading === unit.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
                {deleteUnitError && <div className="text-red-600 mt-2">{deleteUnitError}</div>}
              </div>
            </div>
            {/* Add Apartment Unit Modal */}
            {showAddUnitModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full">
                  <h2 className="text-lg font-bold mb-4">Add Apartment Unit</h2>
                  {unitAddError && <div className="text-red-600 mb-2">{unitAddError}</div>}
                  <form onSubmit={handleAddUnit} className="space-y-3">
                    <input type="text" name="name" value={unitForm.name} onChange={handleUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Unit Name" required />
                    <input type="number" name="rent_amount" value={unitForm.rent_amount} onChange={handleUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Rent Amount" required />
                    <input type="text" name="rent_frequency" value={unitForm.rent_frequency} onChange={handleUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Rent Frequency (e.g. monthly)" required />
                    <select name="is_occupied" value={unitForm.is_occupied} onChange={handleUnitChange} className="w-full px-4 py-2 border rounded">
                      <option value="0">Not Occupied</option>
                      <option value="1">Occupied</option>
                    </select>
                    <div className="flex justify-between mt-4">
                      <button type="button" onClick={() => setShowAddUnitModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                      <button type="submit" disabled={unitAddLoading} className="bg-green-500 text-white px-4 py-2 rounded">{unitAddLoading ? 'Adding...' : 'Add Unit'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Edit Property Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Update Property</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                value={editData.title || ''}
                onChange={e => setEditData({ ...editData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Title"
                required
              />
              <input
                type="text"
                name="address"
                value={editData.address || ''}
                onChange={e => setEditData({ ...editData, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Address"
                required
              />
              <input
                type="text"
                name="city"
                value={editData.city || ''}
                onChange={e => setEditData({ ...editData, city: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="City"
                required
              />
              <input
                type="text"
                name="state"
                value={editData.state || ''}
                onChange={e => setEditData({ ...editData, state: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="State"
                required
              />
              <input
                type="number"
                name="price"
                value={editData.price || ''}
                onChange={e => setEditData({ ...editData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Price"
                required
              />
              <textarea
                name="description"
                value={editData.description || ''}
                onChange={e => setEditData({ ...editData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Description"
                rows={3}
              />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded">{loading ? 'Updating...' : 'Update'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Upload Images Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Upload Images</h2>
            <form onSubmit={handleImageUpload} className="space-y-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={e => setImageFiles(e.target.files)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowImageModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded">{loading ? 'Uploading...' : 'Upload'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Upload Images Modal for Unit */}
      {showUnitImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Upload Images for Unit</h2>
            {unitImageError && <div className="text-red-600 mb-2">{unitImageError}</div>}
            <form onSubmit={handleUnitImageUpload} className="space-y-3">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={e => setUnitImageFiles(e.target.files)}
                className="w-full px-4 py-2 border rounded"
              />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowUnitImageModal(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={unitImageLoading} className="bg-green-500 text-white px-4 py-2 rounded">{unitImageLoading ? 'Uploading...' : 'Upload'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Unit Modal */}
      {showEditUnitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Edit Apartment Unit</h2>
            {editUnitError && <div className="text-red-600 mb-2">{editUnitError}</div>}
            <form onSubmit={handleEditUnit} className="space-y-3">
              <input type="text" name="name" value={editUnitForm.name || ''} onChange={handleEditUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Unit Name" required />
              <input type="number" name="rent_amount" value={editUnitForm.rent_amount || ''} onChange={handleEditUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Rent Amount" required />
              <input type="text" name="rent_frequency" value={editUnitForm.rent_frequency || ''} onChange={handleEditUnitChange} className="w-full px-4 py-2 border rounded" placeholder="Rent Frequency (e.g. monthly)" required />
              <select name="is_occupied" value={editUnitForm.is_occupied || '0'} onChange={handleEditUnitChange} className="w-full px-4 py-2 border rounded">
                <option value="0">Not Occupied</option>
                <option value="1">Occupied</option>
              </select>
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowEditUnitModal(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={editUnitLoading} className="bg-green-500 text-white px-4 py-2 rounded">{editUnitLoading ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;