import React, { useState } from 'react';
import { Star, Calendar, Users, Phone, Upload, Check, X } from 'lucide-react';

const HotelBookingSystem: React.FC = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const roomCategories = [
    {
      name: 'Standard room',
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
      price: '1,300,000',
      image: 'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      status: 'Book'
    }
  ];

  const BookingModal = () => {
    const [formData, setFormData] = useState({
      checkIn: '',
      checkOut: '',
      guests: '',
      phone: '',
      additionalDetails: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setShowBookingModal(false);
      setShowPaymentModal(true);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Book a hotel</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Fill in details below to book a hotel room</p>
            </div>
            <button onClick={() => setShowBookingModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
              placeholder="Check in"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
              placeholder="Check out"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
              placeholder="Number of Guests"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={(e) => setFormData({...formData, additionalDetails: e.target.value})}
              placeholder="Additional details (optional)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Pay
            </button>
          </form>
        </div>
      </div>
    );
  };

  const PaymentModal = () => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const renderStep1 = () => (
      <div className="p-4 sm:p-6 space-y-4">
        <div className="space-y-3">
          <div
            onClick={() => setPaymentMethod('card')}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
              paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <span className="text-gray-700">Pay with card</span>
            {paymentMethod === 'card' && <Check className="h-5 w-5 text-green-500" />}
          </div>
          <div
            onClick={() => setPaymentMethod('transfer')}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
              paymentMethod === 'transfer' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <span className="text-gray-700">Pay with transfer</span>
            {paymentMethod === 'transfer' && <Check className="h-5 w-5 text-green-500" />}
          </div>
        </div>
        <button
          onClick={() => setCurrentStep(paymentMethod === 'transfer' ? 2 : 3)}
          disabled={!paymentMethod}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Pay
        </button>
      </div>
    );

    const renderStep2 = () => (
      <div className="p-4 sm:p-6 space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Account number</h3>
          <p className="text-2xl font-bold text-gray-900 mb-2">03874920244</p>
          <p className="text-gray-600 mb-4">Bank</p>
          <p className="text-xl font-semibold text-gray-900">OPay</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
          <Upload className="h-5 w-5 text-yellow-600" />
          <span className="text-gray-700">Upload proof of payment</span>
        </div>
        <button
          onClick={() => setCurrentStep(4)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Upload
        </button>
      </div>
    );

    const renderStep3 = () => (
      <div className="p-4 sm:p-6 space-y-4">
        <input
          type="text"
          placeholder="Card number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">Card name</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="9/2025"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Cvv"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={() => setCurrentStep(4)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Pay
        </button>
      </div>
    );

    const renderStep4 = () => (
      <div className="p-4 sm:p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Avelo hotel</h3>
          <div className="space-y-3 text-left bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-600">Check in date</span>
              <span className="font-medium">May 20th, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check out date</span>
              <span className="font-medium">May 31st, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Number of room</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone number</span>
              <span className="font-medium">08140423043</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment date</span>
              <span className="font-medium">May 20th, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction id</span>
              <span className="font-medium">089654456786</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900">Payment amount</span>
              <span className="text-gray-900">$200,000</span>
            </div>
          </div>
          <div className="flex justify-center my-6">
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-xs text-gray-500">QR Code</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowPaymentModal(false)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Done
        </button>
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {currentStep === 1 ? 'Select a payment option' : 
                 currentStep === 4 ? 'Hotel receipt' : 'Book a hotel'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Fill in details below to book a hotel room</p>
            </div>
            <button onClick={() => setShowPaymentModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>
      </div>
    );
  };

  const CreateRoomModal = () => {
    const [step, setStep] = useState(1);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Create a room</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{step}/2</p>
            </div>
            <button onClick={() => setShowCreateRoomModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {step === 1 ? (
              <>
                <input
                  type="text"
                  placeholder="Room name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Room Categories</option>
                  <option>Standard</option>
                  <option>Deluxe</option>
                  <option>Superior</option>
                </select>
                <input
                  type="text"
                  placeholder="Price"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  placeholder="Room description"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Images</p>
                  <input type="file" multiple accept="image/*" className="hidden" id="images" />
                  <label htmlFor="images" className="cursor-pointer text-green-600 hover:text-green-700">
                    Upload Images
                  </label>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload video (optional)</p>
                  <input type="file" accept="video/*" className="hidden" id="video" />
                  <label htmlFor="video" className="cursor-pointer text-green-600 hover:text-green-700">
                    Upload Video
                  </label>
                </div>
                <button
                  onClick={() => setShowCreateRoomModal(false)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Create
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Hotel Booking System</h2>
        <button
          onClick={() => setShowCreateRoomModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Create Room
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Hotel Details */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
                alt="Avelo hotel"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-lg font-semibold">
                $10/daily
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Uyo, Akwa Ibom, Nigeria</p>
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
                  <span className="text-sm text-gray-600">5.7/10</span>
                </div>
              </div>

              <div className="flex space-x-8 border-b border-gray-200 mb-6">
                <button className="pb-2 text-green-600 border-b-2 border-green-600 font-medium">
                  Hotel details
                </button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">Video</button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">Reviews</button>
              </div>

              <div className="text-gray-600 text-sm leading-relaxed">
                <p>
                  Consectetur definitionem cu mei, usu legere minimum ne. Pro epicuri constituam ne, atqui lucillius indoctum nam id. Eu timeam voluptas vel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Room categories</h3>
          {roomCategories.map((room, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={room.image} alt={room.name} className="w-12 h-12 rounded object-cover" />
                <div>
                  <h4 className="font-medium text-gray-900">{room.name}</h4>
                  <p className="text-sm text-gray-600">₦{room.price}/per day</p>
                </div>
              </div>
              <button
                onClick={() => setShowBookingModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                {room.status}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showBookingModal && <BookingModal />}
      {showPaymentModal && <PaymentModal />}
      {showCreateRoomModal && <CreateRoomModal />}
    </div>
  );
};

export default HotelBookingSystem;