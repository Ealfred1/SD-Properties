import React from 'react';
import { apiRequestWithAuth } from '../../utils/api';

type Booking = {
  id: number;
  guest_name?: string;
  guest?: string;
  check_in?: string;
  check_out?: string;
  status?: string;
};

type BookingModalsProps = {
  hotelId: number | null;
  onClose: () => void;
};

const BookingModals: React.FC<BookingModalsProps> = ({ hotelId, onClose }) => {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = React.useState(false);
  const [bookingsError, setBookingsError] = React.useState('');
  const [showBookModal, setShowBookModal] = React.useState(false);
  const [bookingForm, setBookingForm] = React.useState({
    check_in: '',
    check_out: '',
    guests: '',
    phone: '',
    details: ''
  });

  const fetchBookings = async () => {
    if (!hotelId) return;

    setBookingsLoading(true);
    setBookingsError('');
    try {
      const response = await apiRequestWithAuth('GET', `/manager/hotel/${hotelId}/bookings`);
      setBookings(response.data || []);
    } catch (err: any) {
      setBookingsError(err?.message || 'Failed to fetch bookings.');
    } finally {
      setBookingsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBookings();
  }, [hotelId]);

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelId) return;

    setBookingsLoading(true);
    setBookingsError('');

    try {
      await apiRequestWithAuth('POST', '/manager/hotel/bookings', {
        ...bookingForm,
        hotel_id: hotelId
      });
      setShowBookModal(false);
      setBookingForm({
        check_in: '',
        check_out: '',
        guests: '',
        phone: '',
        details: ''
      });
      await fetchBookings();
    } catch (err: any) {
      setBookingsError(err?.message || 'Failed to book hotel.');
    } finally {
      setBookingsLoading(false);
    }
  };

  const BookHotelModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Book a hotel</h2>
        {bookingsError && <div className="text-red-500 mb-4">{bookingsError}</div>}
        <form onSubmit={handleBookHotel} className="space-y-4">
          <input
            type="date"
            name="check_in"
            value={bookingForm.check_in}
            onChange={handleBookingChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Check in"
            required
          />
          <input
            type="date"
            name="check_out"
            value={bookingForm.check_out}
            onChange={handleBookingChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Check out"
            required
          />
          <input
            type="number"
            name="guests"
            value={bookingForm.guests}
            onChange={handleBookingChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Number of Guests"
            required
          />
          <input
            type="tel"
            name="phone"
            value={bookingForm.phone}
            onChange={handleBookingChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Phone number"
            required
          />
          <textarea
            name="details"
            value={bookingForm.details}
            onChange={handleBookingChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Additional details (optional)"
          />
          <button
            type="submit"
            disabled={bookingsLoading}
            className="w-full bg-green-600 text-white py-2 rounded mt-4"
          >
            {bookingsLoading ? 'Processing...' : 'Book Now'}
          </button>
        </form>
        <button
          className="mt-6 text-gray-500 underline"
          onClick={() => setShowBookModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );

  if (!hotelId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Hotel Bookings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <button
          onClick={() => setShowBookModal(true)}
          className="mb-6 bg-green-500 text-white px-4 py-2 rounded"
        >
          New Booking
        </button>

        {bookingsLoading ? (
          <div className="text-center py-8 text-gray-500">Loading bookings...</div>
        ) : bookingsError ? (
          <div className="text-center py-8 text-red-500">{bookingsError}</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Guest</th>
                  <th className="px-4 py-2 text-left">Check In</th>
                  <th className="px-4 py-2 text-left">Check Out</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{booking.guest_name || booking.guest || '-'}</td>
                    <td className="px-4 py-2">{booking.check_in || '-'}</td>
                    <td className="px-4 py-2">{booking.check_out || '-'}</td>
                    <td className="px-4 py-2">{booking.status || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showBookModal && <BookHotelModal />}
      </div>
    </div>
  );
};

export default BookingModals;