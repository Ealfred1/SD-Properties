import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const hotel = {
  name: 'Aveelo hotel',
  address: 'Uyo, Akwa Ibom, Nigeria',
  rating: 5.7,
  price: '$10/daily',
  image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  gallery: [
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  ],
  details: 'Consetetur definitionem cu mea, usu legere minimum ne. Pro epicurei constituam ne, atqui lucilius indoctum nam id. Eu timeam volumus vel,Consetetur definitionem cu mea, usu legere minimum ne. Pro epicurei constituam ne, atqui lucilius indoctum nam id. Eu timeam volumus vel,Consetetur definitionem cu mea, usu legere minimum ne. Pro epicurei constituam ne, atqui lucilius indoctum nam id. Eu timeam volumus vel,',
  rooms: [
    { name: 'Standard room', price: '40,000/per day', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop' },
    { name: 'Deluxe room', price: '130,000/per day', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { name: 'Superior room', price: '1,300,000/per day', image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  ],
};

const HotelBookingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'video' | 'reviews'>('details');
  const [showBookModal, setShowBookModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  // BookHotelModal stub
  const BookHotelModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Book a hotel</h2>
        <form className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Check in" />
          <input className="w-full border rounded px-3 py-2" placeholder="Check out" />
          <input className="w-full border rounded px-3 py-2" placeholder="Number of Guests" />
          <input className="w-full border rounded px-3 py-2" placeholder="Phone number" />
          <input className="w-full border rounded px-3 py-2" placeholder="Addition details (option)" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4">Pay</button>
        </form>
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowBookModal(false)}>Close</button>
      </div>
    </div>
  );

  // CreateRoomModal stub
  const CreateRoomModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Create a room</h2>
        <form className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Room name" />
          <input className="w-full border rounded px-3 py-2" placeholder="Room Categories" />
          <input className="w-full border rounded px-3 py-2" placeholder="Price" />
          <input className="w-full border rounded px-3 py-2" placeholder="Room description" />
          <div className="bg-yellow-50 rounded-lg p-4 text-center">Images</div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">Upload video (optional)</div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4">Create</button>
        </form>
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowCreateRoomModal(false)}>Close</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="text-gray-900 font-bold text-lg">Saint </span>
            <span className="text-green-500 font-bold text-lg">Davies</span>
            <span className="hidden sm:inline text-xs text-gray-500 uppercase tracking-wide ml-2">Properties</span>
          </div>
          <div className="flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-green-500">Home</a>
            <a href="#" className="hover:text-green-500">Properties</a>
            <a href="#" className="hover:text-green-500">Shortlet apartment</a>
            <a href="#" className="hover:text-green-500">Request</a>
            <a href="#" className="hover:text-green-500">Oversea</a>
            <a href="#" className="hover:text-green-500">Contact us</a>
            <a href="#" className="hover:text-green-500">About us</a>
            <a href="#" className="hover:text-green-500">Book hotel</a>
            <a href="#" className="hover:text-green-500">Dashboard</a>
            <a href="#" className="hover:text-green-500">Log out</a>
          </div>
        </div>
      </nav>
      {/* Dashboard Header */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex items-center space-x-2 text-xs sm:text-sm mb-3 sm:mb-4">
            <a href="#" className="text-yellow-400 hover:text-yellow-300">Home</a>
            <span className="text-gray-300">›</span>
            <span className="text-gray-300">Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Dashboard</h1>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 mb-8 lg:mb-0">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
            <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left font-semibold bg-green-50 text-green-700 border-l-4 border-green-500`}>
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50">
              <span>Wishlist</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50">
              <span>Compare</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50">
              <span>Reviews</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50">
              <span>My bookings</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50">
              <span>Change password</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50">
              <span>Savings</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50">
              <span>Logout</span>
            </button>
          </div>
        </aside>
        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hotel Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
              <div className="flex-1">
                <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover rounded-lg mb-4 md:mb-0" />
                <div className="flex space-x-2 mt-2">
                  {hotel.gallery.map((img, idx) => (
                    <img key={idx} src={img} alt="gallery" className="w-16 h-12 object-cover rounded" />
                  ))}
                </div>
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-500 font-bold text-lg">{hotel.price}</span>
                  <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-1" onClick={() => setShowBookModal(true)}>
                    <Plus className="h-4 w-4" /> <span>Book a hotel</span>
                  </button>
                </div>
                <div className="text-gray-700 font-bold text-xl mb-1">{hotel.name}</div>
                <div className="text-gray-500 text-sm mb-2">{hotel.address}</div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-500 font-bold">★ {hotel.rating}/10</span>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button className={`border-b-2 ${activeTab === 'details' ? 'border-green-500 text-green-700' : 'border-transparent text-gray-600'} px-2 pb-1`} onClick={() => setActiveTab('details')}>Hotel details</button>
                  <button className={`border-b-2 ${activeTab === 'video' ? 'border-green-500 text-green-700' : 'border-transparent text-gray-600'} px-2 pb-1`} onClick={() => setActiveTab('video')}>Video</button>
                  <button className={`border-b-2 ${activeTab === 'reviews' ? 'border-green-500 text-green-700' : 'border-transparent text-gray-600'} px-2 pb-1`} onClick={() => setActiveTab('reviews')}>Reviews</button>
                </div>
              </div>
            </div>
          </div>
          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-gray-700 mb-4">{hotel.details}</div>
                {/* Room categories */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4">Rooms categories</h3>
                  <div className="space-y-4">
                    {hotel.rooms.map((room, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                        <div className="flex items-center space-x-4">
                          <img src={room.image} alt={room.name} className="w-16 h-12 object-cover rounded" />
                          <div>
                            <div className="font-semibold text-gray-900">{room.name}</div>
                            <div className="text-xs text-gray-500">{room.price}</div>
                          </div>
                        </div>
                        <button className="bg-green-500 text-white px-4 py-1 rounded" onClick={() => setShowBookModal(true)}>Book</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Optionally, add more info or a sidebar here */}
            </div>
          )}
          {activeTab === 'video' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">Video content here (embed or upload)</div>
          )}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">Reviews content here</div>
          )}
        </main>
      </div>
      {/* Modals */}
      {showBookModal && <BookHotelModal />}
      {showCreateRoomModal && <CreateRoomModal />}
    </div>
  );
};

export default HotelBookingDashboard; 