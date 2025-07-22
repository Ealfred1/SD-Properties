import React from 'react';
import { apiRequestWithAuth } from '../../utils/api';

type Hotel = {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  video_url?: string;
  price: string;
  policies?: string;
  cancellation_policy?: string;
  amenities?: string[];
  images?: string[];
  [key: string]: any;
};

type EditHotelModalProps = {
  show: boolean;
  hotel: Hotel | null;
  onClose: () => void;
  onSuccess: () => void;
};

const EditHotelModal: React.FC<EditHotelModalProps> = ({ show, hotel, onClose, onSuccess }) => {
  const [editForm, setEditForm] = React.useState<Hotel | null>(null);
  const [editLoading, setEditLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  React.useEffect(() => {
    if (hotel) {
      setEditForm(hotel);
    }
  }, [hotel]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (!editForm) return;

    if (name === 'amenities' && type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditForm(prev => ({
        ...prev!,
        amenities: checked
          ? [...(prev?.amenities || []), value]
          : (prev?.amenities || []).filter(a => a !== value)
      }));
    } else {
      setEditForm(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleEditHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    setEditLoading(true);
    setFormError('');
    const formData = new FormData();
    
    Object.entries(editForm).forEach(([k, v]) => {
      if (k === 'amenities' && Array.isArray(v)) {
        v.forEach(a => formData.append('amenities[]', a));
      } else {
        formData.append(k, String(v));
      }
    });
    formData.append('_method', 'put');

    try {
      await apiRequestWithAuth('POST', `/manager/hotel/${editForm.id}`, formData, true);
      onSuccess();
      onClose();
    } catch (err: any) {
      setFormError(err?.message || 'Failed to update hotel.');
    } finally {
      setEditLoading(false);
    }
  };

  if (!show || !editForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Edit Hotel</h2>
        {formError && <div className="text-red-600 mb-2">{formError}</div>}
        <form onSubmit={handleEditHotel} className="space-y-3">
          <input
            type="text"
            name="name"
            value={editForm.name || ''}
            onChange={handleEditChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Hotel Name"
            required
          />
          <textarea
            name="description"
            value={editForm.description || ''}
            onChange={handleEditChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="address"
            value={editForm.address || ''}
            onChange={handleEditChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="city"
            value={editForm.city || ''}
            onChange={handleEditChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            value={editForm.state || ''}
            onChange={handleEditChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="State"
            required
          />
          <input
            type="text"
            name="country"
            value={editForm.country || ''}
            onChange={handleEditChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Country"
            required
          />
          <input
            type="text"
            name="price"
            value={editForm.price || ''}
            onChange={handleEditChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Price"
            required
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={editLoading}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {editLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotelModal;