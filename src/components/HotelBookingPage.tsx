import React, { useState, useEffect } from 'react';
import { Star, Eye, Pencil, Trash } from 'lucide-react';
import BookingModal from './BookingModal';
import { apiRequestWithAuth } from '../utils/api';
// Remove useNavigate import

// Add types for Hotel, Room, Booking
interface Hotel {
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
}
interface Room {
  id: number;
  name: string;
  price: string;
  images?: string[];
  [key: string]: any;
}
interface Booking {
  id: number;
  guest_name?: string;
  check_in?: string;
  check_out?: string;
  status?: string;
  [key: string]: any;
}

interface HotelBookingPageProps {
  onSelectHotel: (hotel: any) => void;
}

const HotelBookingPage: React.FC<HotelBookingPageProps> = ({ onSelectHotel }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [addHotelLoading, setAddHotelLoading] = useState(false);
  const [addHotelError, setAddHotelError] = useState('');
  const [addHotelForm, setAddHotelForm] = useState({
    name: '', description: '', address: '', city: '', state: '', country: '', video_url: '', price: '', policies: '', cancellation_policy: '', amenities: [] as string[],
  });
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState('');
  const [hoveredHotelId, setHoveredHotelId] = useState<number | null>(null);
  const [managerModalHotel, setManagerModalHotel] = useState<any | null>(null);
  const [editHotelModal, setEditHotelModal] = useState<any | null>(null);
  const [editHotelForm, setEditHotelForm] = useState<any>({});
  const [editHotelLoading, setEditHotelLoading] = useState(false);
  const [editHotelError, setEditHotelError] = useState('');
  const [deleteHotelLoading, setDeleteHotelLoading] = useState<number | null>(null);
  // Remove useNavigate

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiRequestWithAuth('GET', '/manager/hotel');
        console.log('Hotels API response:', res);
        setHotels(res.data || []);
        if (res.data && res.data.length > 0) {
          setSelectedHotel(res.data[0]);
        } else {
          setSelectedHotel(null);
        }
      } catch (err: unknown) {
        const error = err as { message?: string };
        setError(error?.message || 'Failed to load hotels.');
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    if (!selectedHotel) return;
    const fetchRooms = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiRequestWithAuth('GET', `/manager/hotel/${selectedHotel.id}/rooms`);
        console.log('Rooms API response:', res);
        setRooms(res.data || []);
      } catch (err: unknown) {
        const error = err as { message?: string };
        setError(error?.message || 'Failed to load rooms.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [selectedHotel]);

  // Add hotel logic
  const handleAddHotelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'amenities' && type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setAddHotelForm(prev => ({
        ...prev,
        amenities: checked ? [...prev.amenities, value] : prev.amenities.filter(a => a !== value)
      }));
    } else {
      setAddHotelForm(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleAddHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddHotelLoading(true);
    setAddHotelError('');
    const formData = new FormData();
    Object.entries(addHotelForm).forEach(([k, v]) => {
      if (k === 'amenities' && Array.isArray(v)) {
        v.forEach(a => formData.append('amenities[]', a));
      } else {
        formData.append(k, String(v));
      }
    });
    try {
      await apiRequestWithAuth('POST', '/manager/hotel', formData, true);
      setShowAddHotelModal(false);
      setAddHotelForm({ name: '', description: '', address: '', city: '', state: '', country: '', video_url: '', price: '', policies: '', cancellation_policy: '', amenities: [] });
      // Refresh hotels
      const res = await apiRequestWithAuth('GET', '/manager/hotel');
      setHotels(res.data || []);
      if (res.data && res.data.length > 0) setSelectedHotel(res.data[0]);
    } catch (err: any) {
      setAddHotelError(err?.message || 'Failed to add hotel.');
    } finally {
      setAddHotelLoading(false);
    }
  };

  // Bookings logic
  const openBookingsModal = async () => {
    setShowBookingsModal(true);
    setBookingsLoading(true);
    setBookingsError('');
    try {
      const res = await apiRequestWithAuth('GET', '/manager/hotel/bookings');
      setBookings(res.data || []);
    } catch (err: any) {
      setBookingsError(err?.message || 'Failed to fetch bookings.');
    } finally {
      setBookingsLoading(false);
    }
  };

  // Edit hotel logic
  const openEditHotelModal = (hotel: any) => {
    setEditHotelForm({
      name: hotel.attributes?.name || '',
      description: hotel.attributes?.description || '',
      address: hotel.attributes?.address || '',
      city: hotel.attributes?.city || '',
      state: hotel.attributes?.state || '',
      country: hotel.attributes?.country || '',
      video_url: hotel.attributes?.video_url || '',
      price: hotel.attributes?.price || '',
      policies: hotel.attributes?.policies || '',
      cancellation_policy: hotel.attributes?.cancellation_policy || '',
      amenities: hotel.attributes?.amenities || [],
    });
    setEditHotelModal(hotel);
  };
  const handleEditHotelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'amenities' && type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditHotelForm((prev: any) => ({
        ...prev,
        amenities: checked ? [...prev.amenities, value] : prev.amenities.filter((a: string) => a !== value)
      }));
    } else {
      setEditHotelForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  const handleEditHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editHotelModal) return;
    setEditHotelLoading(true);
    setEditHotelError('');
    const formData = new FormData();
    Object.entries(editHotelForm).forEach(([k, v]) => {
      if (k === 'amenities' && Array.isArray(v)) {
        v.forEach(a => formData.append('amenities[]', a));
      } else {
        formData.append(k, String(v));
      }
    });
    formData.append('_method', 'put');
    try {
      await apiRequestWithAuth('POST', `/manager/hotel/${editHotelModal.id}`, formData, true);
      setEditHotelModal(null);
      // Refresh hotels
      const res = await apiRequestWithAuth('GET', '/manager/hotel');
      setHotels(res.data.data || []);
      if (res.data.data && res.data.data.length > 0) setSelectedHotel(res.data.data[0]);
    } catch (err: any) {
      setEditHotelError(err?.message || 'Failed to update hotel.');
    } finally {
      setEditHotelLoading(false);
    }
  };
  // Delete hotel logic
  const handleDeleteHotel = async (hotelId: number) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    setDeleteHotelLoading(hotelId);
    try {
      await apiRequestWithAuth('DELETE', `/manager/hotel/${hotelId}`);
      // Refresh hotels
      const res = await apiRequestWithAuth('GET', '/manager/hotel');
      setHotels(res.data.data || []);
      if (res.data.data && res.data.data.length > 0) setSelectedHotel(res.data.data[0]);
    } catch (err: any) {
      alert(err?.message || 'Failed to delete hotel.');
    } finally {
      setDeleteHotelLoading(null);
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowAddHotelModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2"
        >
          <span>Add Hotel</span>
        </button>
        <button
          onClick={openBookingsModal}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
          disabled={!selectedHotel}
        >
          <span>View Bookings</span>
        </button>
              </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {hotels.map((hotel: any) => (
          <div
            key={hotel.id}
            className="relative bg-white rounded-2xl shadow border p-4 md:p-6 flex flex-col w-full max-w-2xl mx-auto transition-transform hover:shadow-lg hover:scale-[1.025] cursor-pointer"
            onClick={e => {
              if ((e.target as HTMLElement).closest('.hotel-action-icon')) return;
              onSelectHotel(hotel);
            }}
          >
            {/* Action Icons */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                className="hotel-action-icon bg-green-100 hover:bg-green-200 text-green-700 rounded-full p-2 shadow-sm focus:outline-none"
                title="View Manager Details"
                onClick={e => { e.stopPropagation(); setManagerModalHotel(hotel); }}
              >
                <Eye className="h-5 w-5" />
              </button>
              <button
                className="hotel-action-icon bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full p-2 shadow-sm focus:outline-none"
                title="Edit Hotel"
                onClick={e => { e.stopPropagation(); openEditHotelModal(hotel); }}
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                className="hotel-action-icon bg-red-100 hover:bg-red-200 text-red-700 rounded-full p-2 shadow-sm focus:outline-none"
                title="Delete Hotel"
                onClick={e => { e.stopPropagation(); handleDeleteHotel(hotel.id); }}
                disabled={deleteHotelLoading === hotel.id}
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
            <img
              src={hotel.relationships?.images?.[0]?.attributes?.path || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop'}
              alt={hotel.attributes?.name}
              className="w-full h-56 object-cover rounded-xl mb-4 border"
            />
            <h2 className="text-2xl font-bold mb-1 text-gray-900 truncate">{hotel.attributes?.name}</h2>
            <p className="text-gray-600 mb-2 line-clamp-2">{hotel.attributes?.description}</p>
            <div className="mb-2 text-sm text-gray-700 space-y-1">
              <div><span className="font-semibold">Address:</span> {hotel.attributes?.address}</div>
              <div className="flex gap-2 flex-wrap">
                <span><span className="font-semibold">City:</span> {hotel.attributes?.city}</span>
                <span><span className="font-semibold">State:</span> {hotel.attributes?.state}</span>
                <span><span className="font-semibold">Country:</span> {hotel.attributes?.country}</span>
              </div>
              <div><span className="font-semibold">Price:</span> <span className="text-green-600 font-bold">₦{hotel.attributes?.price}</span></div>
              <div><span className="font-semibold">Amenities:</span> {hotel.attributes?.amenities?.join(', ') || 'None'}</div>
            </div>
          </div>
                    ))}
                  </div>
      {/* Manager Details Modal */}
      {managerModalHotel && managerModalHotel.relationships?.manager?.attributes && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setManagerModalHotel(null)}
              title="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-green-700">Manager Details</h2>
            <div className="mb-2"><span className="font-semibold">Name:</span> {managerModalHotel.relationships.manager.attributes.name}</div>
            <div className="mb-2"><span className="font-semibold">Email:</span> {managerModalHotel.relationships.manager.attributes.email}</div>
            <div className="mb-2"><span className="font-semibold">Phone:</span> {managerModalHotel.relationships.manager.attributes.phone}</div>
            <div className="mb-2"><span className="font-semibold">Role:</span> {managerModalHotel.relationships.manager.attributes.role}</div>
                </div>
              </div>
      )}
      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal onClose={() => setShowBookingModal(false)} />
      )}
      {/* Add Hotel Modal */}
      {showAddHotelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg" style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 className="text-lg font-bold mb-4">Add Hotel</h2>
            {addHotelError && <div className="text-red-600 mb-2">{addHotelError}</div>}
            <form onSubmit={handleAddHotel} className="space-y-3">
              <input type="text" name="name" value={addHotelForm.name} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Hotel Name" required />
              <textarea name="description" value={addHotelForm.description} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
              <input type="text" name="address" value={addHotelForm.address} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Address" required />
              <input type="text" name="city" value={addHotelForm.city} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="City" required />
              <input type="text" name="state" value={addHotelForm.state} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="State" required />
              <input type="text" name="country" value={addHotelForm.country} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Country" required />
              <input type="text" name="video_url" value={addHotelForm.video_url} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Video URL (optional)" />
              <input type="number" name="price" value={addHotelForm.price} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Price" required />
              <input type="text" name="policies" value={addHotelForm.policies} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Policies (optional)" />
              <input type="text" name="cancellation_policy" value={addHotelForm.cancellation_policy} onChange={handleAddHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Cancellation Policy (optional)" />
              <div className="mb-2">
                <label className="block font-medium mb-1">Amenities:</label>
                <label className="inline-flex items-center mr-3">
                  <input type="checkbox" name="amenities" value="Security" checked={addHotelForm.amenities.includes('Security')} onChange={handleAddHotelChange} /> Security
                </label>
                <label className="inline-flex items-center mr-3">
                  <input type="checkbox" name="amenities" value="Pool" checked={addHotelForm.amenities.includes('Pool')} onChange={handleAddHotelChange} /> Pool
                </label>
                {/* Add more amenities as needed */}
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowAddHotelModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={addHotelLoading} className="bg-green-500 text-white px-4 py-2 rounded">{addHotelLoading ? 'Adding...' : 'Add Hotel'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Hotel Modal */}
      {editHotelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg" style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 className="text-lg font-bold mb-4">Edit Hotel</h2>
            {editHotelError && <div className="text-red-600 mb-2">{editHotelError}</div>}
            <form onSubmit={handleEditHotel} className="space-y-3">
              <input type="text" name="name" value={editHotelForm.name} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Hotel Name" required />
              <textarea name="description" value={editHotelForm.description} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
              <input type="text" name="address" value={editHotelForm.address} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Address" required />
              <input type="text" name="city" value={editHotelForm.city} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="City" required />
              <input type="text" name="state" value={editHotelForm.state} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="State" required />
              <input type="text" name="country" value={editHotelForm.country} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Country" required />
              <input type="text" name="video_url" value={editHotelForm.video_url} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Video URL (optional)" />
              <input type="number" name="price" value={editHotelForm.price} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Price" required />
              <input type="text" name="policies" value={editHotelForm.policies} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Policies (optional)" />
              <input type="text" name="cancellation_policy" value={editHotelForm.cancellation_policy} onChange={handleEditHotelChange} className="w-full px-4 py-2 border rounded" placeholder="Cancellation Policy (optional)" />
              <div className="mb-2">
                <label className="block font-medium mb-1">Amenities:</label>
                <label className="inline-flex items-center mr-3">
                  <input type="checkbox" name="amenities" value="Security" checked={editHotelForm.amenities.includes('Security')} onChange={handleEditHotelChange} /> Security
                </label>
                <label className="inline-flex items-center mr-3">
                  <input type="checkbox" name="amenities" value="Pool" checked={editHotelForm.amenities.includes('Pool')} onChange={handleEditHotelChange} /> Pool
                </label>
                {/* Add more amenities as needed */}
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setEditHotelModal(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                <button type="submit" disabled={editHotelLoading} className="bg-blue-500 text-white px-4 py-2 rounded">{editHotelLoading ? 'Saving...' : 'Save Changes'}</button>
            </div>
            </form>
          </div>
        </div>
      )}
      {/* Bookings Modal */}
      {showBookingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">All Hotel Bookings</h2>
            {bookingsLoading && <div className="text-gray-500">Loading bookings...</div>}
            {bookingsError && <div className="text-red-600 mb-2">{bookingsError}</div>}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {bookings.length === 0 && !bookingsLoading && <div className="text-gray-500">No bookings found.</div>}
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded p-3">
                  <div className="font-semibold">Guest: {booking.guest_name || booking.guest || 'N/A'}</div>
                  <div className="text-sm">Check-in: {booking.check_in}</div>
                  <div className="text-sm">Check-out: {booking.check_out}</div>
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

export default HotelBookingPage;