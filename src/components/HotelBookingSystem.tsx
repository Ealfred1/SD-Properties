import React, { useState } from 'react';
import { Star, Check, X } from 'lucide-react';
// 1. Import QRCode for receipt
import { QRCodeCanvas } from 'qrcode.react';

interface Room {
  name: string;
  price: string;
  image: string;
  status: string;
}

interface Booking {
  room: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  phone: string;
  additionalDetails: string;
  paymentMethod: string;
  receiptId: string;
  date: string;
}

const HotelBookingSystem: React.FC = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  // 2. Add state for bookings and rooms at the top of HotelBookingSystem
  const [rooms, setRooms] = useState<Room[]>([
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
  ]);
  // 3. Update BookingModal to collect all info, then pass to PaymentModal
  const [bookingData, setBookingData] = useState<Booking | null>(null);

  const BookingModal = () => {
    const [formData, setFormData] = useState({
      checkIn: '',
      checkOut: '',
      guests: '',
      phone: '',
      additionalDetails: '',
      room: rooms[0]?.name || '',
    });
    const [step, setStep] = useState(1);
    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setBookingData({ ...formData, paymentMethod: '', receiptId: '', date: new Date().toISOString() });
      setShowBookingModal(false);
      setShowPaymentModal(true);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Book a hotel</h2>
            <button onClick={() => setShowBookingModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {step === 1 && (
              <>
                <select
                  name="room"
                  value={formData.room}
                  onChange={e => setFormData({ ...formData, room: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
                >
                  {rooms.map((r, i) => <option key={i} value={r.name}>{r.name} - ₦{r.price}</option>)}
                </select>
                <input type="date" name="checkIn" value={formData.checkIn} onChange={e => setFormData({ ...formData, checkIn: e.target.value })} required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <input type="date" name="checkOut" value={formData.checkOut} onChange={e => setFormData({ ...formData, checkOut: e.target.value })} required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <button type="button" onClick={handleNext} className="w-full bg-green-500 text-white py-2 rounded">Next</button>
              </>
            )}
            {step === 2 && (
              <>
                <input type="number" name="guests" value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })} placeholder="Number of Guests" required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <input type="tel" name="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone number" required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <textarea name="additionalDetails" value={formData.additionalDetails} onChange={e => setFormData({ ...formData, additionalDetails: e.target.value })} placeholder="Additional details (optional)" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <div className="flex justify-between">
                  <button type="button" onClick={handleBack} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Back</button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Proceed to Payment</button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    );
  };

  const PaymentModal = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [step, setStep] = useState(1);
    const [proof, setProof] = useState<File|null>(null);
    const [cardInfo, setCardInfo] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [paid, setPaid] = useState(false);
    const [receiptId] = useState(() => Math.random().toString(36).substr(2, 9));
    const handlePay = () => {
      setPaid(true);
      // Assuming bookingData is now Booking type
      if (bookingData) {
        // setBookings(prev => [...prev, { ...bookingData, paymentMethod, receiptId, date: new Date().toISOString() }]);
      }
    };
    const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) setProof(e.target.files[0]);
    };
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{step === 3 ? 'Hotel receipt' : 'Payment'}</h2>
            <button onClick={() => setShowPaymentModal(false)} className="p-1 hover:bg-gray-100 rounded-full"><X className="h-5 w-5 text-gray-500" /></button>
          </div>
          <div className="p-4 sm:p-6">
            {step === 1 && (
              <>
                <div className="space-y-3">
                  <div onClick={() => setPaymentMethod('card')} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>Pay with card {paymentMethod === 'card' && <Check className="h-5 w-5 text-green-500" />}</div>
                  <div onClick={() => setPaymentMethod('transfer')} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${paymentMethod === 'transfer' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>Pay with transfer {paymentMethod === 'transfer' && <Check className="h-5 w-5 text-green-500" />}</div>
                </div>
                <button onClick={() => setStep(paymentMethod === 'transfer' ? 2 : 3)} disabled={!paymentMethod} className="w-full bg-green-500 text-white py-2 rounded mt-4">Continue</button>
              </>
            )}
            {step === 2 && paymentMethod === 'transfer' && (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold">Bank Transfer</h3>
                  <p className="text-sm">Account: <span className="font-mono">03874920244</span> (OPay)</p>
                </div>
                <input type="file" accept="image/*" onChange={handleProofUpload} className="mb-2" />
                {proof && <img src={URL.createObjectURL(proof)} alt="Proof" className="w-32 h-24 object-cover rounded mb-2" />}
                <button onClick={() => { handlePay(); setStep(3); }} className="w-full bg-green-500 text-white py-2 rounded">Upload & Finish</button>
              </>
            )}
            {step === 2 && paymentMethod === 'card' && (
              <>
                <input type="text" placeholder="Card number" value={cardInfo.number} onChange={e => setCardInfo({ ...cardInfo, number: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-2" />
                <input type="text" placeholder="Card name" value={cardInfo.name} onChange={e => setCardInfo({ ...cardInfo, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-2" />
                <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="MM/YY" value={cardInfo.expiry} onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value })} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg" />
                  <input type="text" placeholder="CVV" value={cardInfo.cvv} onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
                <button onClick={() => { handlePay(); setStep(3); }} className="w-full bg-green-500 text-white py-2 rounded">Pay</button>
              </>
            )}
            {step === 3 && paid && (
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Payment Successful!</h3>
                <div className="mb-2">Receipt ID: <span className="font-mono text-xs">{receiptId}</span></div>
                <QRCodeCanvas value={receiptId} size={128} className="mx-auto my-2" />
                <div className="mt-2 text-sm">Show this QR code at check-in.</div>
                <button onClick={() => setShowPaymentModal(false)} className="w-full bg-green-500 text-white py-2 rounded mt-4">Close</button>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CreateRoomModal = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', category: '', price: '', description: '', images: [] as File[], video: null as File|null });
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) setForm(f => ({ ...f, images: [...f.images, ...Array.from(e.target.files)] }));
    };
    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) setForm(f => ({ ...f, video: e.target.files![0] }));
    };
    const handleCreate = (e: React.FormEvent) => {
      e.preventDefault();
      setRooms(prev => [...prev, { name: form.name, price: form.price, image: form.images[0] ? URL.createObjectURL(form.images[0]) : '', status: 'Book' }]);
      setShowCreateRoomModal(false);
    };
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Create a room</h2>
            <button onClick={() => setShowCreateRoomModal(false)} className="p-1 hover:bg-gray-100 rounded-full"><X className="h-5 w-5 text-gray-500" /></button>
          </div>
          <form onSubmit={handleCreate} className="p-4 sm:p-6 space-y-4">
            {step === 1 && (
              <>
                <input type="text" placeholder="Room name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <input type="text" placeholder="Room Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <input type="text" placeholder="Price" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <textarea placeholder="Room description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <button type="button" onClick={() => setStep(2)} className="w-full bg-green-500 text-white py-2 rounded">Next</button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="mb-2">Images</div>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="mb-2" />
                <div className="flex gap-2 flex-wrap mb-2">
                  {form.images.map((img, i) => <img key={i} src={URL.createObjectURL(img)} alt="Preview" className="w-16 h-12 object-cover rounded" />)}
                </div>
                <div className="mb-2">Upload video (optional)</div>
                <input type="file" accept="video/*" onChange={handleVideoUpload} className="mb-2" />
                {form.video && <video src={URL.createObjectURL(form.video)} controls className="w-full h-32 rounded mb-2" />}
                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Back</button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create Room</button>
                </div>
              </>
            )}
          </form>
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
          {rooms.map((room, index) => (
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