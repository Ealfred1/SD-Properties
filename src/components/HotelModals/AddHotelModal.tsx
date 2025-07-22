import React from 'react';
import { Plus } from 'lucide-react';
import { apiRequestWithAuth } from '../../utils/api';

type AddHotelModalProps = {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type AddHotelForm = {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  video_url: string;
  price: string;
  policies: string;
  cancellation_policy: string;
  amenities: string[];
};

const initialFormState: AddHotelForm = {
  name: '',
  description: '',
  address: '',
  city: '',
  state: '',
  country: '',
  video_url: '',
  price: '',
  policies: '',
  cancellation_policy: '',
  amenities: []
};

const AddHotelModal: React.FC<AddHotelModalProps> = ({ show, onClose, onSuccess }) => {
  const [addForm, setAddForm] = React.useState<AddHotelForm>(initialFormState);
  const [addLoading, setAddLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'amenities' && type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setAddForm(prev => ({
        ...prev,
        amenities: checked ? [...prev.amenities, value] : prev.amenities.filter(a => a !== value)
      }));
    } else {
      setAddForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setFormError('');
    const formData = new FormData();
    Object.entries(addForm).forEach(([k, v]) => {
      if (k === 'amenities' && Array.isArray(v)) {
        v.forEach(a => formData.append('amenities[]', a));
      } else {
        formData.append(k, String(v));
      }
    });

    try {
      await apiRequestWithAuth('POST', '/manager/hotel', formData, true);
      onSuccess();
      onClose();
      setAddForm(initialFormState);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to add hotel.');
    } finally {
      setAddLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Add Hotel</h2>
        {formError && <div className="text-red-600 mb-2">{formError}</div>}
        <form onSubmit={handleAddHotel} className="space-y-3">
          <input
            type="text"
            name="name"
            value={addForm.name}
            onChange={handleAddChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Hotel Name"
            required
          />
          <textarea
            name="description"
            value={addForm.description}
            onChange={handleAddChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="address"
            value={addForm.address}
            onChange={handleAddChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="city"
            value={addForm.city}
            onChange={handleAddChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            value={addForm.state}
            onChange={handleAddChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="State"
            required
          />
          <input
            type="text"
            name="country"
            value={addForm.country}
            onChange={handleAddChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Country"
            required
          />
          <input
            type="text"
            name="price"
            value={addForm.price}
            onChange={handleAddChange}
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
              disabled={addLoading}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {addLoading ? 'Adding...' : 'Add Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotelModal;