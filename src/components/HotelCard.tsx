import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { Hotel } from './HotelBookingDashboard';

type HotelCardProps = {
  hotel: Hotel;
  onManageRooms: (hotelId: number) => void;
  onManageBookings: (hotelId: number) => void;
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotelId: number) => void;
};

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  onManageRooms,
  onManageBookings,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {hotel.images?.[0] && (
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
      <p className="text-gray-600 mb-4">{hotel.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {`${hotel.city}, ${hotel.state}, ${hotel.country}`}
        </span>
        {hotel.price && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            ₦{hotel.price}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => onManageRooms(hotel.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Rooms
          </button>
          <button
            onClick={() => onManageBookings(hotel.id)}
            className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
          >
            Bookings
          </button>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => onEdit(hotel)}
            className="text-gray-600 hover:text-blue-500"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(hotel.id)}
            className="text-gray-600 hover:text-red-500"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;