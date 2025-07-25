import React, { useState, useEffect } from 'react';
import { Star, Check, X } from 'lucide-react';
// 1. Import QRCode for receipt
import { QRCodeCanvas } from 'qrcode.react';
import { apiRequestWithAuth } from '../utils/api';

interface HotelBookingSystemProps {
  hotel: any | null;
}

const HotelBookingSystem: React.FC<HotelBookingSystemProps> = ({ hotel }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState<any | null>(null);
  const [categoryForm, setCategoryForm] = useState<any>({ name: '', description: '', price: '', capacity: '', amenities: [], bed_type: '', image: null });
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [bookingData, setBookingData] = useState<any | null>(null);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState<any | null>(null);
  const [roomForm, setRoomForm] = useState<any>({ name: '', description: '', room_number: '', room_category_id: '', image: null });
  const [roomLoading, setRoomLoading] = useState(false);
  const [roomError, setRoomError] = useState('');

  // Fetch hotel rooms and categories
  useEffect(() => {
    if (!hotel || !hotel.id) return;
    setLoading(true);
    setError('');
    // Fetch categories always
    const fetchCategories = async () => {
      try {
        const catRes = await apiRequestWithAuth('GET', `/manager/hotel-room-categories?hotel_id=${hotel.id}`);
        setCategories(catRes.data.data || catRes.data || []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load categories.');
      }
    };
    fetchCategories();
    // Fetch rooms separately
    const fetchRooms = async () => {
      try {
        const roomsRes = await apiRequestWithAuth('GET', `/manager/hotel/${hotel.id}/rooms`);
        setRooms(roomsRes.data.data || roomsRes.data || []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load rooms.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [hotel]);

  // Add/Edit Category logic
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'amenities' && type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCategoryForm((prev: any) => ({
        ...prev,
        amenities: checked ? [...prev.amenities, value] : prev.amenities.filter((a: string) => a !== value)
      }));
    } else if (name === 'image') {
      setCategoryForm((prev: any) => ({ ...prev, image: (e.target as HTMLInputElement).files?.[0] || null }));
    } else {
      setCategoryForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryLoading(true);
    setCategoryError('');
    const formData = new FormData();
    formData.append('hotel_id', hotel?.id || '');
    Object.entries(categoryForm).forEach(([k, v]) => {
      if (k === 'amenities' && Array.isArray(v)) {
        v.forEach(a => formData.append('amenities[]', a));
      } else if (k === 'image' && v) {
        formData.append('image', v);
      } else if (k !== 'image') {
        formData.append(k, String(v));
      }
    });
    try {
      await apiRequestWithAuth('POST', '/manager/hotel-room-categories', formData, true);
      setShowAddCategoryModal(false);
      setCategoryForm({ name: '', description: '', price: '', capacity: '', amenities: [], bed_type: '', image: null });
      // Refresh categories
      const catRes = await apiRequestWithAuth('GET', `/manager/hotel-room-categories?hotel_id=${hotel?.id}`);
      setCategories(catRes.data.data || catRes.data || []);
    } catch (err: any) {
      setCategoryError(err?.message || 'Failed to add category.');
    } finally {
      setCategoryLoading(false);
    }
  };
  const openEditCategoryModal = (cat: any) => {
    setCategoryForm({
      name: cat.attributes?.name || '',
      description: cat.attributes?.description || '',
      price: cat.attributes?.price || '',
      capacity: cat.attributes?.capacity || '',
      amenities: cat.attributes?.amenities || [],
      bed_type: cat.attributes?.bed_type || '',
      image: null
    });
    setShowEditCategoryModal(cat);
  };
  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditCategoryModal) return;
    setCategoryLoading(true);
    setCategoryError('');
    const formData = new FormData();
    formData.append('hotel_id', hotel?.id || '');
    Object.entries(categoryForm).forEach(([k, v]) => {
      if (k === 'amenities' && Array.isArray(v)) {
        v.forEach(a => formData.append('amenities[]', a));
      } else if (k === 'image' && v) {
        formData.append('image', v);
      } else if (k !== 'image') {
        formData.append(k, String(v));
      }
    });
    formData.append('_method', 'put');
    try {
      await apiRequestWithAuth('POST', `/manager/hotel-room-categories/${showEditCategoryModal.id}`, formData, true);
      setShowEditCategoryModal(null);
      setCategoryForm({ name: '', description: '', price: '', capacity: '', amenities: [], bed_type: '', image: null });
      // Refresh categories
      const catRes = await apiRequestWithAuth('GET', `/manager/hotel-room-categories?hotel_id=${hotel?.id}`);
      setCategories(catRes.data.data || catRes.data || []);
    } catch (err: any) {
      setCategoryError(err?.message || 'Failed to update category.');
    } finally {
      setCategoryLoading(false);
    }
  };
  const handleDeleteCategory = async (catId: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    setCategoryLoading(true);
    setCategoryError('');
    try {
      await apiRequestWithAuth('DELETE', `/manager/hotel-room-categories/${catId}`);
      // Refresh categories
      const catRes = await apiRequestWithAuth('GET', `/manager/hotel-room-categories?hotel_id=${hotel?.id}`);
      setCategories(catRes.data.data || catRes.data || []);
    } catch (err: any) {
      setCategoryError(err?.message || 'Failed to delete category.');
    } finally {
      setCategoryLoading(false);
    }
  };

  const BookingModal = () => {
    const [formData, setFormData] = useState({
      checkIn: '',
      checkOut: '',
      guests: '',
      phone: '',
      additionalDetails: '',
      room: selectedRoom?.name || '',
    });
    const [step, setStep] = useState(1);
    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);
    const handleSubmit = async (e: React.FormEvent) => {
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
    const handlePay = async () => {
      setPaid(true);
      // Assuming bookingData is now Booking type
      if (bookingData) {
        try {
          await apiRequestWithAuth('POST', '/manager/booking', bookingData);
          // Optionally, update room status or fetch new bookings
        } catch (err: any) {
          setError(err?.message || 'Failed to create booking.');
        }
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
    const handleCreate = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('category', form.category);
        formData.append('price', form.price);
        formData.append('description', form.description);
        formData.append('hotelId', hotel?.id || ''); // Assuming selectedHotel is available
        formData.append('images', form.images[0]); // Assuming only one image for now
        if (form.video) formData.append('video', form.video);

        await apiRequestWithAuth('POST', '/manager/room', formData);
        setShowCreateRoomModal(false);
        // Optionally, update room list or fetch new rooms
      } catch (err: any) {
        setError(err?.message || 'Failed to create room.');
      }
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

  // Room add/edit logic
  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'image') {
      setRoomForm((prev: any) => ({ ...prev, image: (e.target as HTMLInputElement).files?.[0] || null }));
    } else {
      setRoomForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setRoomLoading(true);
    setRoomError('');
    const formData = new FormData();
    formData.append('hotel_id', hotel?.id || '');
    Object.entries(roomForm).forEach(([k, v]) => {
      if (k === 'image' && v) {
        formData.append('image', v);
      } else if (k !== 'image') {
        formData.append(k, String(v));
      }
    });
    try {
      await apiRequestWithAuth('POST', '/manager/hotel-rooms', formData, true);
      setShowAddRoomModal(false);
      setRoomForm({ name: '', description: '', room_number: '', room_category_id: '', image: null });
      // Refresh rooms
      const roomsRes = await apiRequestWithAuth('GET', `/manager/hotel/${hotel.id}/rooms`);
      setRooms(roomsRes.data.data || roomsRes.data || []);
    } catch (err: any) {
      setRoomError(err?.message || 'Failed to add room.');
    } finally {
      setRoomLoading(false);
    }
  };
  const openEditRoomModal = (room: any) => {
    setRoomForm({
      name: room.attributes?.name || '',
      description: room.attributes?.description || '',
      room_number: room.attributes?.room_number || '',
      room_category_id: room.attributes?.room_category_id || '',
      image: null
    });
    setShowEditRoomModal(room);
  };
  const handleEditRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditRoomModal) return;
    setRoomLoading(true);
    setRoomError('');
    const formData = new FormData();
    formData.append('hotel_id', hotel?.id || '');
    Object.entries(roomForm).forEach(([k, v]) => {
      if (k === 'image' && v) {
        formData.append('image', v);
      } else if (k !== 'image') {
        formData.append(k, String(v));
      }
    });
    formData.append('_method', 'put');
    try {
      await apiRequestWithAuth('POST', `/manager/hotel-rooms/${showEditRoomModal.id}`, formData, true);
      setShowEditRoomModal(null);
      setRoomForm({ name: '', description: '', room_number: '', room_category_id: '', image: null });
      // Refresh rooms
      const roomsRes = await apiRequestWithAuth('GET', `/manager/hotel/${hotel.id}/rooms`);
      setRooms(roomsRes.data.data || roomsRes.data || []);
    } catch (err: any) {
      setRoomError(err?.message || 'Failed to update room.');
    } finally {
      setRoomLoading(false);
    }
  };
  const handleDeleteRoom = async (roomId: number) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    setRoomLoading(true);
    setRoomError('');
    try {
      await apiRequestWithAuth('DELETE', `/manager/hotel-rooms/${roomId}`);
      // Refresh rooms
      const roomsRes = await apiRequestWithAuth('GET', `/manager/hotel/${hotel.id}/rooms`);
      setRooms(roomsRes.data.data || roomsRes.data || []);
    } catch (err: any) {
      setRoomError(err?.message || 'Failed to delete room.');
    } finally {
      setRoomLoading(false);
    }
  };

  if (!hotel) {
    return <div className="flex-1 bg-gray-50 flex items-center justify-center text-gray-500 text-lg">Select a hotel to view details.</div>;
  }
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hotel Info - Left Column */}
        <div className="col-span-1 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <img
            src={hotel.relationships?.images?.[0]?.attributes?.path || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop'}
            alt={hotel.attributes?.name}
            className="w-full h-56 object-cover rounded-xl border mb-4"
          />
          <h2 className="text-2xl font-bold mb-2 text-gray-900">{hotel.attributes?.name}</h2>
          <p className="text-gray-600 mb-2">{hotel.attributes?.description}</p>
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
          {hotel.relationships?.manager?.attributes && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-700 mb-1">Manager</div>
              <div className="text-sm text-gray-700"><span className="font-semibold">Name:</span> {hotel.relationships.manager.attributes.name}</div>
              <div className="text-sm text-gray-700"><span className="font-semibold">Email:</span> {hotel.relationships.manager.attributes.email}</div>
              <div className="text-sm text-gray-700"><span className="font-semibold">Phone:</span> {hotel.relationships.manager.attributes.phone}</div>
              <div className="text-sm text-gray-700"><span className="font-semibold">Role:</span> {hotel.relationships.manager.attributes.role}</div>
            </div>
          )}
        </div>
        {/* Right Column - Rooms and Categories */}
        <div className="col-span-2 flex flex-col gap-8">
          {/* Room Categories Section */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Room Categories</h3>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                onClick={() => setShowAddCategoryModal(true)}
              >
                Add Category
              </button>
            </div>
            {categoryError && <div className="text-red-600 mb-2">{categoryError}</div>}
            {categoryLoading && <div className="text-gray-500 mb-2">Loading...</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat: any) => (
                <div key={cat.id} className="bg-gray-50 rounded-lg p-4 border flex flex-col gap-2 relative">
                  <img
                    src={cat.attributes?.image || 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'}
                    alt={cat.attributes?.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <div className="font-bold text-lg text-gray-900">{cat.attributes?.name}</div>
                  <div className="text-sm text-gray-700 mb-1">{cat.attributes?.description}</div>
                  <div className="text-sm"><span className="font-semibold">Price:</span> ₦{cat.attributes?.price}</div>
                  <div className="text-sm"><span className="font-semibold">Capacity:</span> {cat.attributes?.capacity}</div>
                  <div className="text-sm"><span className="font-semibold">Bed Type:</span> {cat.attributes?.bed_type}</div>
                  <div className="text-sm"><span className="font-semibold">Amenities:</span> {cat.attributes?.amenities?.join(', ') || 'None'}</div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded px-3 py-1 text-xs font-medium"
                      onClick={() => openEditCategoryModal(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-100 hover:bg-red-200 text-red-700 rounded px-3 py-1 text-xs font-medium"
                      onClick={() => handleDeleteCategory(cat.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {categories.length === 0 && !categoryLoading && (
                <div className="text-gray-500">No categories found.</div>
              )}
              {console.log('Categories:', categories)}
            </div>
          </div>
          {/* Rooms Section */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Rooms</h3>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                onClick={() => setShowAddRoomModal(true)}
        >
          Create Room
        </button>
      </div>
            {roomError && <div className="text-red-600 mb-2">{roomError}</div>}
            {roomLoading && <div className="text-gray-500 mb-2">Loading...</div>}
            {loading ? (
              <div className="text-gray-500">Loading rooms...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room: any) => (
                  <div key={room.id} className="bg-gray-50 rounded-lg p-4 border flex flex-col gap-2">
                    <img
                      src={room.relationships?.images?.[0]?.attributes?.path || 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'}
                      alt={room.attributes?.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <div className="font-bold text-lg text-gray-900">{room.attributes?.name}</div>
                    <div className="text-sm text-gray-700 mb-1">{room.attributes?.description}</div>
                    <div className="text-sm"><span className="font-semibold">Room Number:</span> {room.attributes?.room_number}</div>
                    <div className="text-sm"><span className="font-semibold">Category:</span> {categories.find((c: any) => c.id === room.attributes?.room_category_id)?.attributes?.name || room.attributes?.room_category_id}</div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded px-3 py-1 text-xs font-medium"
                        onClick={() => openEditRoomModal(room)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-100 hover:bg-red-200 text-red-700 rounded px-3 py-1 text-xs font-medium"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Add Category Modal */}
          {showAddCategoryModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 w-full max-w-lg" style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 className="text-lg font-bold mb-4">Add Room Category</h2>
                {categoryError && <div className="text-red-600 mb-2">{categoryError}</div>}
                <form onSubmit={handleAddCategory} className="space-y-3">
                  <input type="text" name="name" value={categoryForm.name} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Category Name" required />
                  <textarea name="description" value={categoryForm.description} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
                  <input type="number" name="price" value={categoryForm.price} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Price" required />
                  <input type="number" name="capacity" value={categoryForm.capacity} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Capacity" required />
                  <input type="text" name="bed_type" value={categoryForm.bed_type} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Bed Type (e.g. small, medium, large)" />
                  <div className="mb-2">
                    <label className="block font-medium mb-1">Amenities:</label>
                    <label className="inline-flex items-center mr-3">
                      <input type="checkbox" name="amenities" value="AC" checked={categoryForm.amenities.includes('AC')} onChange={handleCategoryChange} /> AC
                    </label>
                    <label className="inline-flex items-center mr-3">
                      <input type="checkbox" name="amenities" value="Security" checked={categoryForm.amenities.includes('Security')} onChange={handleCategoryChange} /> Security
                    </label>
                    {/* Add more amenities as needed */}
                  </div>
                  <div className="mb-2">
                    <label className="block font-medium mb-1">Image:</label>
                    <input type="file" name="image" accept="image/*" onChange={handleCategoryChange} className="w-full" />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button type="button" onClick={() => setShowAddCategoryModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" disabled={categoryLoading} className="bg-green-500 text-white px-4 py-2 rounded">{categoryLoading ? 'Adding...' : 'Add Category'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Edit Category Modal */}
          {showEditCategoryModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 w-full max-w-lg" style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 className="text-lg font-bold mb-4">Edit Room Category</h2>
                {categoryError && <div className="text-red-600 mb-2">{categoryError}</div>}
                <form onSubmit={handleEditCategory} className="space-y-3">
                  <input type="text" name="name" value={categoryForm.name} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Category Name" required />
                  <textarea name="description" value={categoryForm.description} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
                  <input type="number" name="price" value={categoryForm.price} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Price" required />
                  <input type="number" name="capacity" value={categoryForm.capacity} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Capacity" required />
                  <input type="text" name="bed_type" value={categoryForm.bed_type} onChange={handleCategoryChange} className="w-full px-4 py-2 border rounded" placeholder="Bed Type (e.g. small, medium, large)" />
                  <div className="mb-2">
                    <label className="block font-medium mb-1">Amenities:</label>
                    <label className="inline-flex items-center mr-3">
                      <input type="checkbox" name="amenities" value="AC" checked={categoryForm.amenities.includes('AC')} onChange={handleCategoryChange} /> AC
                    </label>
                    <label className="inline-flex items-center mr-3">
                      <input type="checkbox" name="amenities" value="Security" checked={categoryForm.amenities.includes('Security')} onChange={handleCategoryChange} /> Security
                    </label>
                    {/* Add more amenities as needed */}
                  </div>
                  <div className="mb-2">
                    <label className="block font-medium mb-1">Image:</label>
                    <input type="file" name="image" accept="image/*" onChange={handleCategoryChange} className="w-full" />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button type="button" onClick={() => setShowEditCategoryModal(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" disabled={categoryLoading} className="bg-blue-500 text-white px-4 py-2 rounded">{categoryLoading ? 'Saving...' : 'Save Changes'}</button>
                </div>
                </form>
              </div>
            </div>
          )}
          {/* Add Room Modal */}
          {showAddRoomModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 w-full max-w-lg" style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 className="text-lg font-bold mb-4">Create Room</h2>
                {roomError && <div className="text-red-600 mb-2">{roomError}</div>}
                <form onSubmit={handleAddRoom} className="space-y-3">
                  <input type="text" name="name" value={roomForm.name} onChange={handleRoomChange} className="w-full px-4 py-2 border rounded" placeholder="Room Name" required />
                  <textarea name="description" value={roomForm.description} onChange={handleRoomChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
                  <input type="text" name="room_number" value={roomForm.room_number} onChange={handleRoomChange} className="w-full px-4 py-2 border rounded" placeholder="Room Number" required />
                  <select name="room_category_id" value={roomForm.room_category_id} onChange={handleRoomChange} className="w-full px-4 py-2 border rounded" required>
                    <option value="">Select Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.attributes?.name}</option>
                    ))}
                  </select>
                  <div className="mb-2">
                    <label className="block font-medium mb-1">Image:</label>
                    <input type="file" name="image" accept="image/*" onChange={handleRoomChange} className="w-full" />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button type="button" onClick={() => setShowAddRoomModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" disabled={roomLoading} className="bg-green-500 text-white px-4 py-2 rounded">{roomLoading ? 'Creating...' : 'Create Room'}</button>
              </div>
                </form>
              </div>
            </div>
          )}
          {/* Edit Room Modal */}
          {showEditRoomModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 w-full max-w-lg" style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 className="text-lg font-bold mb-4">Edit Room</h2>
                {roomError && <div className="text-red-600 mb-2">{roomError}</div>}
                <form onSubmit={handleEditRoom} className="space-y-3">
                  <input type="text" name="name" value={roomForm.name} onChange={handleRoomChange} className="w-full px-4 py-2 border rounded" placeholder="Room Name" required />
                  <textarea name="description" value={roomForm.description} onChange={handleRoomChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
                  <input type="text" name="room_number" value={roomForm.room_number} onChange={handleRoomChange} className="w-full px-4 py-2 border rounded" placeholder="Room Number" required />
                  <select name="room_category_id" value={roomForm.room_category_id} onChange={handleRoomChange} className="w-full px-4 py-2 border rounded" required>
                    <option value="">Select Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.attributes?.name}</option>
                    ))}
                  </select>
                  <div className="mb-2">
                    <label className="block font-medium mb-1">Image:</label>
                    <input type="file" name="image" accept="image/*" onChange={handleRoomChange} className="w-full" />
          </div>
                  <div className="flex justify-between mt-4">
                    <button type="button" onClick={() => setShowEditRoomModal(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" disabled={roomLoading} className="bg-blue-500 text-white px-4 py-2 rounded">{roomLoading ? 'Saving...' : 'Save Changes'}</button>
        </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {showBookingModal && <BookingModal />}
      {showPaymentModal && <PaymentModal />}
      {showCreateRoomModal && <CreateRoomModal />}
    </div>
  );
};

export default HotelBookingSystem;
