import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { apiRequestWithAuth } from '../utils/api';
import AddHotelModal from './HotelModals/AddHotelModal';
import EditHotelModal from './HotelModals/EditHotelModal';
import RoomModals from './HotelModals/RoomModals';
import BookingModals from './HotelModals/BookingModals';
import HotelCard from './HotelCard';

export type Hotel = {
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

const HotelBookingDashboard: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<Hotel | null>(null);
  const [showRoomsModal, setShowRoomsModal] = useState<number | null>(null);
  const [showBookingsModal, setShowBookingsModal] = useState<number | null>(null);

  const fetchHotels = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiRequestWithAuth('GET', '/manager/hotel');
      setHotels(res.data || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load hotels.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDeleteHotel = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    
    try {
      await apiRequestWithAuth('DELETE', `/manager/hotel/${id}`);
      await fetchHotels();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete hotel.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Hotel Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" /> <span>Add Hotel</span>
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading hotels...</div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No hotels found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onManageRooms={(hotelId) => setShowRoomsModal(hotelId)}
              onManageBookings={(hotelId) => setShowBookingsModal(hotelId)}
              onEdit={(hotel) => setShowEditModal(hotel)}
              onDelete={handleDeleteHotel}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddHotelModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchHotels}
        />
      )}

      {showEditModal && (
        <EditHotelModal
          show={true}
          hotel={showEditModal}
          onClose={() => setShowEditModal(null)}
          onSuccess={fetchHotels}
        />
      )}

      {showRoomsModal && (
        <RoomModals
          hotelId={showRoomsModal}
          onClose={() => setShowRoomsModal(null)}
        />
      )}

      {showBookingsModal && (
        <BookingModals
          hotelId={showBookingsModal}
          onClose={() => setShowBookingsModal(null)}
        />
      )}
    </div>
  );
};

export default HotelBookingDashboard;