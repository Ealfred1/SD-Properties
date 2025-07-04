import React, { useState } from 'react';
import { Star } from 'lucide-react';
import BookingModal from './BookingModal';

const HotelBookingPage: React.FC = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const roomCategories = [
    {
      name: 'Deluxe room',
      price: '40,000',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      status: 'Book'
    },
    {
      name: 'Deluxe room',
      price: '130,000',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      status: 'Book'
    },
    {
      name: 'Superior room',
      price: '1,000,000',
      image: 'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      status: 'Book'
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Hotel Details - Left Column */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Hotel Image with Price Badge */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
                alt="Avelo hotel"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-lg font-semibold">
                $10/daily
              </div>
              
              {/* Thumbnail Images */}
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop`}
                    alt={`Hotel view ${i}`}
                    className="w-12 h-12 rounded object-cover border-2 border-white"
                  />
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {/* Hotel Info */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Uyo Akwa Ibom Nigeria</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Avelo hotel</h2>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">/10</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex space-x-8 border-b border-gray-200 mb-6">
                <button className="pb-2 text-green-600 border-b-2 border-green-600 font-medium">
                  Hotel details
                </button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">
                  Video
                </button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">
                  Reviews
                </button>
              </div>

              {/* Hotel Description */}
              <div className="text-gray-600 text-sm leading-relaxed">
                <p>
                  Consectetur definitionem cu mei, usu legere minimum ne. Pro epicuri constituam ne, atqui lucillius indoctum nam id. Eu timeam voluptas vel.Consectetur definitionem cu mei, usu legere minimum ne. Pro epicuri constituam ne, atqui lucillius indoctum nam id. Eu timeam voluptas vel.Consectetur definitionem cu mei, usu legere minimum ne. Pro epicuri constituam ne, atqui lucillius indoctum nam id. Eu timeam voluptas vel.Consectetur definitionem cu mei, usu legere minimum ne. Pro epicuri constituam nam id. Eu timeam voluptas vel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Room Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Room categories</h3>
          
          {roomCategories.map((room, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{room.name}</h4>
                  <p className="text-sm text-gray-600">₦{room.price}/per day</p>
                </div>
              </div>
              <button
                onClick={() => setShowBookingModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {room.status}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  );
};

export default HotelBookingPage;