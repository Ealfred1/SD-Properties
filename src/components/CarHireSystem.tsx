import React, { useState, useEffect } from 'react';
import { Upload, X, Star, Phone, MessageSquare } from 'lucide-react';
import { apiRequestWithAuth } from '../utils/api';

interface Car {
  id: number;
  attributes: {
    title: string;
    make: string;
    model: string;
    year: string;
    condition: string;
    transmission: string;
    fuel_type: string;
    price: string;
    type: string;
    rent_frequency: string;
    location: string;
    description: string;
    [key: string]: any;
  };
  relationships?: {
    manager?: { attributes: { name: string; email: string; phone: string; role: string } };
    files?: { attributes: { path: string } }[];
    [key: string]: any;
  };
}

const CarHireSystem: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<Car | null>(null);
  const [carForm, setCarForm] = useState<{
    title: string;
    make: string;
    model: string;
    year: string;
    condition: string;
    transmission: string;
    fuel_type: string;
    price: string;
    type: string;
    rent_frequency: string;
    location: string;
    description: string;
    image: File | null;
  }>({ title: '', make: '', model: '', year: '', condition: '', transmission: '', fuel_type: '', price: '', type: '', rent_frequency: '', location: '', description: '', image: null });
  const [carLoading, setCarLoading] = useState<boolean>(false);
  const [carError, setCarError] = useState<string>('');
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiRequestWithAuth('GET', '/manager/cars');
        setCars((res.data as Car[]) || []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load cars.');
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleCarChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'image') {
      setCarForm((prev) => ({ ...prev, image: (e.target as HTMLInputElement).files?.[0] || null }));
    } else {
      setCarForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarLoading(true);
    setCarError('');
    const formData = new FormData();
    Object.entries(carForm).forEach(([k, v]) => {
      if (k === 'image' && v) {
        formData.append('image', v);
      } else if (k !== 'image') {
        formData.append(k, String(v));
      }
    });
    try {
      await apiRequestWithAuth('POST', '/manager/cars', formData, true);
      setShowUploadModal(false);
      setCarForm({ title: '', make: '', model: '', year: '', condition: '', transmission: '', fuel_type: '', price: '', type: '', rent_frequency: '', location: '', description: '', image: null });
      // Refresh cars
      const res = await apiRequestWithAuth('GET', '/manager/cars');
      setCars(res.data.data || res.data || []);
    } catch (err: any) {
      setCarError(err?.message || 'Failed to add car.');
    } finally {
      setCarLoading(false);
    }
  };
  const openEditModal = (car: Car) => {
    setCarForm({
      title: car.attributes?.title || '',
      make: car.attributes?.make || '',
      model: car.attributes?.model || '',
      year: car.attributes?.year || '',
      condition: car.attributes?.condition || '',
      transmission: car.attributes?.transmission || '',
      fuel_type: car.attributes?.fuel_type || '',
      price: car.attributes?.price || '',
      type: car.attributes?.type || '',
      rent_frequency: car.attributes?.rent_frequency || '',
      location: car.attributes?.location || '',
      description: car.attributes?.description || '',
      image: null
    });
    setShowEditModal(car);
  };
  const handleEditCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditModal) return;
    setCarLoading(true);
    setCarError('');
    const formData = new FormData();
    Object.entries(carForm).forEach(([k, v]) => {
      if (k === 'image' && v) {
        formData.append('image', v);
      } else if (k !== 'image') {
        formData.append(k, String(v));
      }
    });
    formData.append('_method', 'put');
    try {
      await apiRequestWithAuth('POST', `/manager/cars/${showEditModal.id}`, formData, true);
      setShowEditModal(null);
      setCarForm({ title: '', make: '', model: '', year: '', condition: '', transmission: '', fuel_type: '', price: '', type: '', rent_frequency: '', location: '', description: '', image: null });
      // Refresh cars
      const res = await apiRequestWithAuth('GET', '/manager/cars');
      setCars(res.data.data || res.data || []);
    } catch (err: any) {
      setCarError(err?.message || 'Failed to update car.');
    } finally {
      setCarLoading(false);
    }
  };
  const handleDeleteCar = async (carId: number) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    setCarLoading(true);
    setCarError('');
    try {
      await apiRequestWithAuth('DELETE', `/manager/cars/${carId}`);
      // Refresh cars
      const res = await apiRequestWithAuth('GET', '/manager/cars');
      setCars(res.data.data || res.data || []);
    } catch (err: any) {
      setCarError(err?.message || 'Failed to delete car.');
    } finally {
      setCarLoading(false);
    }
  };

  const openBookingsModal = async () => {
    setShowBookingsModal(true);
    setBookingsLoading(true);
    setBookingsError('');
    try {
      const res = await apiRequestWithAuth('GET', '/manager/cars/hires');
      setBookings(res.data.data || res.data || []);
      console.log('Car bookings:', res.data.data || res.data || []);
    } catch (err: any) {
      setBookingsError(err?.message || 'Failed to fetch bookings.');
    } finally {
      setBookingsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Car Hire System</h2>
        <div className="flex gap-2">
          <button
            onClick={openBookingsModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            View Bookings
          </button>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Upload Car
        </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Car Details */}
        <div className="xl:col-span-2">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading cars...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No cars found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cars.map((car: Car) => (
                <div key={car.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                  <img
                    src={car.relationships?.files?.[0]?.attributes?.path || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop'}
                    alt={car.attributes?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{car.attributes?.title}</h2>
                    <div className="text-sm text-gray-700 mb-2">{car.attributes?.description}</div>
                    <div className="text-xs text-gray-500 mb-2">{car.attributes?.make} {car.attributes?.model} ({car.attributes?.year})</div>
                    <div className="flex flex-wrap gap-2 text-xs mb-2">
                      <span className="bg-gray-100 px-2 py-1 rounded">{car.attributes?.condition}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{car.attributes?.transmission}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{car.attributes?.fuel_type}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{car.attributes?.type}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{car.attributes?.rent_frequency}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{car.attributes?.location}</span>
                    </div>
                    <div className="font-bold text-green-600 mb-2">₦{car.attributes?.price}</div>
                    <div className="flex gap-2 mt-auto">
                      <button
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded px-3 py-1 text-xs font-medium"
                        onClick={() => openEditModal(car)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-100 hover:bg-red-200 text-red-700 rounded px-3 py-1 text-xs font-medium"
                        onClick={() => handleDeleteCar(car.id)}
                      >
                        Delete
                      </button>
              </div>
                    {car.relationships?.manager?.attributes && (
                      <div className="mt-3 p-2 bg-green-50 rounded">
                        <div className="font-semibold text-green-700 text-xs mb-1">Manager: {car.relationships.manager.attributes.name}</div>
                        <div className="text-xs text-gray-700">{car.relationships.manager.attributes.email} | {car.relationships.manager.attributes.phone}</div>
            </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Property Agent Card */}
        <div className="space-y-4">
          <div className="bg-green-500 text-white rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-1">Property Agent</h3>
            
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                alt="Agent"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-green-100 text-sm">+234-803-456-7890</p>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between items-center">
                <span className="text-green-100 text-xs sm:text-sm">Daily Rate</span>
                <span className="font-semibold text-xs sm:text-sm">$50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100 text-xs sm:text-sm">Weekly Rate</span>
                <span className="font-semibold text-xs sm:text-sm">$300</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100 text-xs sm:text-sm">Monthly Rate</span>
                <span className="font-semibold text-xs sm:text-sm">$1,200</span>
              </div>
            </div>
            
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm mb-3 flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </button>

            <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm flex items-center justify-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Send Message Now</span>
            </button>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg" style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 className="text-lg font-bold mb-4">Upload Car</h2>
            {carError && <div className="text-red-600 mb-2">{carError}</div>}
            <form onSubmit={handleAddCar} className="space-y-3">
              <input type="text" name="title" value={carForm.title} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Car Title" required />
              <input type="text" name="make" value={carForm.make} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Make" required />
              <input type="text" name="model" value={carForm.model} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Model" required />
              <input type="number" name="year" value={carForm.year} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Year" required />
              <select name="condition" value={carForm.condition} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
              <select name="transmission" value={carForm.transmission} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
              <select name="fuel_type" value={carForm.fuel_type} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
              </select>
              <input type="number" name="price" value={carForm.price} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Price" required />
              <select name="type" value={carForm.type} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Type</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
              <select name="rent_frequency" value={carForm.rent_frequency} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Rent Frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <input type="text" name="location" value={carForm.location} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Location" required />
              <textarea name="description" value={carForm.description} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
              <div className="mb-2">
                <label className="block font-medium mb-1">Image:</label>
                <input type="file" name="image" accept="image/*" onChange={handleCarChange} className="w-full" />
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowUploadModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={carLoading} className="bg-green-500 text-white px-4 py-2 rounded">{carLoading ? 'Uploading...' : 'Upload Car'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg" style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 className="text-lg font-bold mb-4">Edit Car</h2>
            {carError && <div className="text-red-600 mb-2">{carError}</div>}
            <form onSubmit={handleEditCar} className="space-y-3">
              <input type="text" name="title" value={carForm.title} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Car Title" required />
              <input type="text" name="make" value={carForm.make} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Make" required />
              <input type="text" name="model" value={carForm.model} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Model" required />
              <input type="number" name="year" value={carForm.year} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Year" required />
              <select name="condition" value={carForm.condition} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
              <select name="transmission" value={carForm.transmission} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
              <select name="fuel_type" value={carForm.fuel_type} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
              </select>
              <input type="number" name="price" value={carForm.price} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Price" required />
              <select name="type" value={carForm.type} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Type</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
              <select name="rent_frequency" value={carForm.rent_frequency} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" required>
                <option value="">Rent Frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <input type="text" name="location" value={carForm.location} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Location" required />
              <textarea name="description" value={carForm.description} onChange={handleCarChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
              <div className="mb-2">
                <label className="block font-medium mb-1">Image:</label>
                <input type="file" name="image" accept="image/*" onChange={handleCarChange} className="w-full" />
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowEditModal(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={carLoading} className="bg-blue-500 text-white px-4 py-2 rounded">{carLoading ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showBookingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl" style={{ maxWidth: 700, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 className="text-lg font-bold mb-4">Car Bookings</h2>
            {bookingsLoading && <div className="text-gray-500">Loading bookings...</div>}
            {bookingsError && <div className="text-red-600 mb-2">{bookingsError}</div>}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {bookings.length === 0 && !bookingsLoading && <div className="text-gray-500">No bookings found.</div>}
              {bookings.map((booking: any) => (
                <div key={booking.id} className="border rounded p-3 mb-2">
                  <div className="font-semibold">Car: {booking.car?.attributes?.title || booking.car_id}</div>
                  <div className="text-sm">User: {booking.user?.attributes?.name || booking.user_id}</div>
                  <div className="text-sm">From: {booking.start_date}</div>
                  <div className="text-sm">To: {booking.end_date}</div>
                  <div className="text-sm">Status: {booking.status}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowBookingsModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarHireSystem;