import React, { useEffect, useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
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
  [key: string]: any;
}

interface PropertiesPageProps {
  onSelectProperty: (property: Property) => void;
}

const PropertiesPage: React.FC<PropertiesPageProps> = ({ onSelectProperty }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    price: '',
    is_available: '1',
    sop: '',
    property_type: 'rent',
    property_category: '1',
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiRequestWithAuth('GET', '/manager/properties');
        setProperties(res.data || []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load properties.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    try {
      await apiRequestWithAuth('POST', '/manager/properties', addForm, true);
      setShowAddModal(false);
      setAddForm({
        title: '', description: '', address: '', city: '', state: '', price: '', is_available: '1', sop: '', property_type: 'rent', property_category: '1',
      });
      // Refresh properties
      const res = await apiRequestWithAuth('GET', '/manager/properties');
      setProperties(res.data || []);
    } catch (err: any) {
      setAddError(err?.message || 'Failed to add property.');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Properties list</h2>
        {loading && <div className="text-gray-500">Loading properties...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 group cursor-pointer"
              onClick={() => onSelectProperty(property)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={property.image || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'}
                  alt={property.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Address: <span className="font-medium">{property.address}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ₦{property.price}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
      {/* Floating Add Button */}
      <button
        className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors z-50"
        onClick={() => setShowAddModal(true)}
        title="Add Property"
      >
        <Plus className="h-6 w-6" />
      </button>
      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Add Property</h2>
            {addError && <div className="text-red-600 mb-2">{addError}</div>}
            <form onSubmit={handleAddProperty} className="space-y-3">
              <input type="text" name="title" value={addForm.title} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Title" required />
              <textarea name="description" value={addForm.description} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Description" required />
              <input type="text" name="address" value={addForm.address} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Address" required />
              <input type="text" name="city" value={addForm.city} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="City" required />
              <input type="text" name="state" value={addForm.state} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="State" required />
              <input type="number" name="price" value={addForm.price} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Price" required />
              <input type="text" name="sop" value={addForm.sop} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Size of property (sop)" required />
              <select name="is_available" value={addForm.is_available} onChange={handleAddChange} className="w-full px-4 py-2 border rounded">
                <option value="1">Available</option>
                <option value="0">Not Available</option>
              </select>
              <select name="property_type" value={addForm.property_type} onChange={handleAddChange} className="w-full px-4 py-2 border rounded">
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
              <input type="text" name="property_category" value={addForm.property_category} onChange={handleAddChange} className="w-full px-4 py-2 border rounded" placeholder="Property Category (e.g. 1)" required />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={addLoading} className="bg-green-500 text-white px-4 py-2 rounded">{addLoading ? 'Adding...' : 'Add Property'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;