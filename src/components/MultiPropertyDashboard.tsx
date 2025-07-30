import React, { useState, useEffect } from 'react';
import { ChevronRight, Plus, Share2, Heart, Star, Calendar, Car, User, CreditCard, LogOut } from 'lucide-react';
import ShareLinkModal from './ShareLinkModal';
import { apiRequestWithAuth } from '../utils/api';

// TypeScript interfaces for real data
interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string | null;
  price: string;
  is_available: boolean;
  image: string | null;
  property_type: string | null;
  property_category: string;
  created_at: string;
  updated_at: string;
  relationships?: any;
}

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

interface PropertyApiItem {
  id: number;
  attributes: any;
  relationships?: any;
}

const mockProperties = [
  {
    id: 1,
    name: '3th story building',
    address: '55th deacon abel drive, itu rd, Akwa ibom',
    tenant: 'Virtue',
    expiringDate: '12th Mar 2025',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Spacious 2-bedroom flat in a modern building',
    rentAmount: 900000,
    lastPaymentDate: '24th Jan 2025',
    agentName: 'Virtue Andrew',
    agentPhone: '08140435024',
    maintenance: [
      { title: 'Change toilet', date: '20th Mar 2025' },
      { title: 'Painting', date: '20th Mar 2025' },
      { title: 'Change socket', date: '20th Mar 2025' }
    ],
    rentStartDate: '24th Mar 2025',
    rentExpiryDate: '24th Mar 2025',
  },
  // ...more properties
];

// Transform property data from API
const transformPropertyData = (data: PropertyApiItem[]): Property[] => {
  return (data || []).map((item) => {
    let image = null;
    if (item.relationships && item.relationships.files && item.relationships.files.length > 0) {
      image = item.relationships.files[0].attributes?.path || null;
    } else if (item.attributes.image) {
      image = item.attributes.image;
    }
    return {
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      address: item.attributes.address,
      city: item.attributes.city,
      state: item.attributes.state,
      price: item.attributes.price,
      is_available: item.attributes.is_available,
      image,
      property_type: item.attributes.property_type,
      property_category: item.attributes.property_category,
      created_at: item.attributes.created_at,
      updated_at: item.attributes.updated_at,
      relationships: item.relationships || {},
    };
  });
};

const MultiPropertyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showAddMaintenanceModal, setShowAddMaintenanceModal] = useState(false);
  
  // New state for user features
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCarHireModal, setShowCarHireModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Real data state
  const [properties, setProperties] = useState<Property[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [carHires, setCarHires] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    avatar: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    subscription: 'Premium',
    subscriptionExpiry: '2024-12-31'
  });

  // Loading states
  const [loading, setLoading] = useState({
    properties: false,
    hotels: false,
    cars: false,
    wishlist: false,
    reviews: false,
    bookings: false,
    carHires: false,
    profile: false,
    subscription: false
  });

  const [error, setError] = useState({
    properties: '',
    hotels: '',
    cars: '',
    wishlist: '',
    reviews: '',
    bookings: '',
    carHires: '',
    profile: '',
    subscription: ''
  });

  // Form states
  const [reviewForm, setReviewForm] = useState({
    item_type: 'property',
    item_id: '',
    service_type: 'rent',
    rating: 5,
    comment: ''
  });

  const [bookingForm, setBookingForm] = useState({
    hotel_id: '',
    room_id: '',
    check_in_date: '',
    check_out_date: '',
    number_of_guests: '',
    special_requests: ''
  });

  const [carHireForm, setCarHireForm] = useState({
    car_id: '',
    pickup_datetime: '',
    return_datetime: '',
    pickup_location: '',
    dropoff_location: '',
    duration_in_days: ''
  });

  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: '',
    image: null as File | null
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  // URL parameter routing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['dashboard', 'properties', 'maintenance', 'subscription', 'wishlist', 'reviews', 'bookings', 'car-hire', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  // Real data fetching functions
  const fetchProperties = async () => {
    setLoading(prev => ({ ...prev, properties: true }));
    setError(prev => ({ ...prev, properties: '' }));
    try {
      const res = await apiRequestWithAuth('GET', '/manager/properties?include=files,tenants,manager,units');
      setProperties(transformPropertyData(res.data));
    } catch (err: any) {
      setError(prev => ({ ...prev, properties: err?.message || 'Failed to load properties' }));
    } finally {
      setLoading(prev => ({ ...prev, properties: false }));
    }
  };

  const fetchHotels = async () => {
    setLoading(prev => ({ ...prev, hotels: true }));
    setError(prev => ({ ...prev, hotels: '' }));
    try {
      const res = await apiRequestWithAuth('GET', '/manager/hotel');
      setHotels(res.data || []);
    } catch (err: any) {
      setError(prev => ({ ...prev, hotels: err?.message || 'Failed to load hotels' }));
    } finally {
      setLoading(prev => ({ ...prev, hotels: false }));
    }
  };

  const fetchCars = async () => {
    setLoading(prev => ({ ...prev, cars: true }));
    setError(prev => ({ ...prev, cars: '' }));
    try {
      const res = await apiRequestWithAuth('GET', '/manager/cars');
      setCars((res.data as Car[]) || []);
    } catch (err: any) {
      setError(prev => ({ ...prev, cars: err?.message || 'Failed to load cars' }));
    } finally {
      setLoading(prev => ({ ...prev, cars: false }));
    }
  };

  // API Functions
  const fetchWishlist = async () => {
    setLoading(prev => ({ ...prev, wishlist: true }));
    setError(prev => ({ ...prev, wishlist: '' }));
    try {
      const res = await apiRequestWithAuth('GET', '/users/wishlist');
      setWishlist(res.data || []);
    } catch (err: any) {
      setError(prev => ({ ...prev, wishlist: err?.message || 'Failed to load wishlist' }));
    } finally {
      setLoading(prev => ({ ...prev, wishlist: false }));
    }
  };

  const addToWishlist = async (itemType: string, itemId: string) => {
    try {
      const formData = new FormData();
      formData.append('item_type', itemType);
      formData.append('item_id', itemId);
      await apiRequestWithAuth('POST', '/users/wishlist/add', formData, true);
      await fetchWishlist();
    } catch (err: any) {
      setError(prev => ({ ...prev, wishlist: err?.message || 'Failed to add to wishlist' }));
    }
  };

  const removeFromWishlist = async (itemType: string, itemId: string) => {
    try {
      const formData = new FormData();
      formData.append('item_type', itemType);
      formData.append('item_id', itemId);
      await apiRequestWithAuth('POST', '/users/wishlist/remove', formData, true);
      await fetchWishlist();
    } catch (err: any) {
      setError(prev => ({ ...prev, wishlist: err?.message || 'Failed to remove from wishlist' }));
    }
  };

  const toggleWishlist = async (itemType: string, itemId: string) => {
    try {
      const formData = new FormData();
      formData.append('item_type', itemType);
      formData.append('item_id', itemId);
      await apiRequestWithAuth('POST', '/users/wishlist/toggle', formData, true);
      await fetchWishlist();
    } catch (err: any) {
      setError(prev => ({ ...prev, wishlist: err?.message || 'Failed to toggle wishlist' }));
    }
  };

  const addReview = async (formData: FormData) => {
    setLoading(prev => ({ ...prev, reviews: true }));
    setError(prev => ({ ...prev, reviews: '' }));
    try {
      await apiRequestWithAuth('POST', '/users/reviews/add', formData, true);
      await fetchReviews();
      setShowReviewModal(false);
      setReviewForm({
        item_type: 'property',
        item_id: '',
        service_type: 'rent',
        rating: 5,
        comment: ''
      });
    } catch (err: any) {
      setError(prev => ({ ...prev, reviews: err?.message || 'Failed to add review' }));
    } finally {
      setLoading(prev => ({ ...prev, reviews: false }));
    }
  };

  const deleteReview = async (itemType: string, itemId: string, serviceType: string) => {
    try {
      const formData = new FormData();
      formData.append('item_type', itemType);
      formData.append('item_id', itemId);
      formData.append('service_type', serviceType);
      await apiRequestWithAuth('POST', '/users/reviews/delete', formData, true);
      await fetchReviews();
    } catch (err: any) {
      setError(prev => ({ ...prev, reviews: err?.message || 'Failed to delete review' }));
    }
  };

  const fetchReviews = async () => {
    setLoading(prev => ({ ...prev, reviews: true }));
    setError(prev => ({ ...prev, reviews: '' }));
    try {
      const res = await apiRequestWithAuth('GET', '/users/reviews');
      setReviews(res.data || []);
    } catch (err: any) {
      setError(prev => ({ ...prev, reviews: err?.message || 'Failed to load reviews' }));
    } finally {
      setLoading(prev => ({ ...prev, reviews: false }));
    }
  };

  const fetchBookings = async () => {
    setLoading(prev => ({ ...prev, bookings: true }));
    setError(prev => ({ ...prev, bookings: '' }));
    try {
      const res = await apiRequestWithAuth('GET', '/users/hotel-bookings');
      setBookings(res.data || []);
    } catch (err: any) {
      setError(prev => ({ ...prev, bookings: err?.message || 'Failed to load bookings' }));
    } finally {
      setLoading(prev => ({ ...prev, bookings: false }));
    }
  };

  const createBooking = async (formData: FormData) => {
    setLoading(prev => ({ ...prev, bookings: true }));
    setError(prev => ({ ...prev, bookings: '' }));
    try {
      await apiRequestWithAuth('POST', '/users/hotel-bookings', formData, true);
      await fetchBookings();
      setShowBookingModal(false);
      setBookingForm({
        hotel_id: '',
        room_id: '',
        check_in_date: '',
        check_out_date: '',
        number_of_guests: '',
        special_requests: ''
      });
    } catch (err: any) {
      setError(prev => ({ ...prev, bookings: err?.message || 'Failed to create booking' }));
    } finally {
      setLoading(prev => ({ ...prev, bookings: false }));
    }
  };

  const payForBooking = async (bookingId: string) => {
    try {
      const formData = new FormData();
      formData.append('booking_id', bookingId);
      formData.append('callback_url', window.location.origin + '/dashboard?tab=bookings');
      await apiRequestWithAuth('POST', '/users/hotel-bookings/pay', formData, true);
      await fetchBookings();
    } catch (err: any) {
      setError(prev => ({ ...prev, bookings: err?.message || 'Failed to process payment' }));
    }
  };

  const fetchCarHires = async () => {
    setLoading(prev => ({ ...prev, carHires: true }));
    setError(prev => ({ ...prev, carHires: '' }));
    try {
      const res = await apiRequestWithAuth('GET', '/users/car-hires');
      setCarHires(res.data || []);
    } catch (err: any) {
      setError(prev => ({ ...prev, carHires: err?.message || 'Failed to load car hires' }));
    } finally {
      setLoading(prev => ({ ...prev, carHires: false }));
    }
  };

  const createCarHire = async (formData: FormData) => {
    setLoading(prev => ({ ...prev, carHires: true }));
    setError(prev => ({ ...prev, carHires: '' }));
    try {
      await apiRequestWithAuth('POST', '/users/car-hires', formData, true);
      await fetchCarHires();
      setShowCarHireModal(false);
      setCarHireForm({
        car_id: '',
        pickup_datetime: '',
        return_datetime: '',
        pickup_location: '',
        dropoff_location: '',
        duration_in_days: ''
      });
    } catch (err: any) {
      setError(prev => ({ ...prev, carHires: err?.message || 'Failed to create car hire' }));
    } finally {
      setLoading(prev => ({ ...prev, carHires: false }));
    }
  };

  const payForCarHire = async (hireId: string) => {
    try {
      const formData = new FormData();
      formData.append('hire_id', hireId);
      formData.append('callback_url', window.location.origin + '/dashboard?tab=car-hire');
      await apiRequestWithAuth('POST', `/users/car-hires/pay?hire_id=${hireId}&callback_url=${encodeURIComponent(window.location.origin + '/dashboard?tab=car-hire')}`, formData, true);
      await fetchCarHires();
    } catch (err: any) {
      setError(prev => ({ ...prev, carHires: err?.message || 'Failed to process payment' }));
    }
  };

  const fetchProfile = async () => {
    setLoading(prev => ({ ...prev, profile: true }));
    setError(prev => ({ ...prev, profile: '' }));
    try {
      const res = await apiRequestWithAuth('GET', '/users/profile');
      if (res.data && res.data.attributes) {
        setUserProfile({
          name: res.data.attributes.name,
          email: res.data.attributes.email,
          phone: res.data.attributes.phone,
          avatar: res.data.attributes.image || userProfile.avatar,
          subscription: userProfile.subscription,
          subscriptionExpiry: userProfile.subscriptionExpiry
        });
      }
    } catch (err: any) {
      setError(prev => ({ ...prev, profile: err?.message || 'Failed to load profile' }));
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const updateProfile = async (formData: FormData) => {
    setLoading(prev => ({ ...prev, profile: true }));
    setError(prev => ({ ...prev, profile: '' }));
    try {
      formData.append('_method', 'put');
      await apiRequestWithAuth('POST', '/users/profile', formData, true);
      await fetchProfile();
      setShowProfileModal(false);
      setProfileForm({
        name: '',
        phone: '',
        address: '',
        image: null
      });
    } catch (err: any) {
      setError(prev => ({ ...prev, profile: err?.message || 'Failed to update profile' }));
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const updatePassword = async (formData: FormData) => {
    setLoading(prev => ({ ...prev, profile: true }));
    setError(prev => ({ ...prev, profile: '' }));
    try {
      formData.append('_method', 'put');
      await apiRequestWithAuth('POST', '/users/profile/password', formData, true);
      setShowPasswordModal(false);
      setPasswordForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
    } catch (err: any) {
      setError(prev => ({ ...prev, profile: err?.message || 'Failed to update password' }));
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const updateProfileImage = async (formData: FormData) => {
    setLoading(prev => ({ ...prev, profile: true }));
    setError(prev => ({ ...prev, profile: '' }));
    try {
      formData.append('_method', 'put');
      await apiRequestWithAuth('POST', '/users/profile/image', formData, true);
      await fetchProfile();
    } catch (err: any) {
      setError(prev => ({ ...prev, profile: err?.message || 'Failed to update profile image' }));
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const fetchSubscription = async () => {
    setLoading(prev => ({ ...prev, subscription: true }));
    setError(prev => ({ ...prev, subscription: '' }));
    try {
      const res = await apiRequestWithAuth('GET', '/subscription');
      if (res.data) {
        setUserProfile(prev => ({
          ...prev,
          subscription: res.data.plan || 'Free',
          subscriptionExpiry: res.data.expires_at || 'N/A'
        }));
      }
    } catch (err: any) {
      setError(prev => ({ ...prev, subscription: err?.message || 'Failed to load subscription' }));
    } finally {
      setLoading(prev => ({ ...prev, subscription: false }));
    }
  };

  const subscribeToPlan = async (planData: FormData) => {
    setLoading(prev => ({ ...prev, subscription: true }));
    setError(prev => ({ ...prev, subscription: '' }));
    try {
      await apiRequestWithAuth('POST', '/subscription', planData, true);
      await fetchSubscription();
      setShowSubscriptionModal(false);
    } catch (err: any) {
      setError(prev => ({ ...prev, subscription: err?.message || 'Failed to subscribe' }));
    } finally {
      setLoading(prev => ({ ...prev, subscription: false }));
    }
  };

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchProperties();
      fetchHotels();
      fetchCars();
    } else if (activeTab === 'properties') {
      fetchProperties();
    } else if (activeTab === 'wishlist') {
      fetchWishlist();
    } else if (activeTab === 'reviews') {
      fetchReviews();
    } else if (activeTab === 'bookings') {
      fetchBookings();
    } else if (activeTab === 'car-hire') {
      fetchCarHires();
    } else if (activeTab === 'profile') {
      fetchProfile();
    } else if (activeTab === 'subscription') {
      fetchSubscription();
    }
  }, [activeTab]);

  // Add Property Modal (stub)
  const renderAddPropertyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Add a Property</h2>
        <form className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Property name" />
          <input className="w-full border rounded px-3 py-2" placeholder="House Address" />
          <input className="w-full border rounded px-3 py-2" placeholder="Number of apartment" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4">Pay</button>
        </form>
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowAddPropertyModal(false)}>Close</button>
      </div>
    </div>
  );

  // Add Maintenance Modal (stub)
  const renderAddMaintenanceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Add Maintenance</h2>
        <form className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Description" />
          <input className="w-full border rounded px-3 py-2" placeholder="Amount" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4">Add</button>
        </form>
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowAddMaintenanceModal(false)}>Close</button>
      </div>
    </div>
  );

  // Subscription Modal
  const renderSubscriptionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Manage Subscription</h2>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Current Plan: {userProfile.subscription}</h3>
            <p className="text-green-600 text-sm">Expires: {userProfile.subscriptionExpiry}</p>
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded">Upgrade Plan</button>
        </div>
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowSubscriptionModal(false)}>Close</button>
      </div>
    </div>
  );

  // Review Modal
  const renderReviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Add Review</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('item_type', reviewForm.item_type);
          formData.append('item_id', reviewForm.item_id);
          formData.append('service_type', reviewForm.service_type);
          formData.append('rating', reviewForm.rating.toString());
          formData.append('comment', reviewForm.comment);
          await addReview(formData);
        }} className="space-y-4">
          <select 
            className="w-full border rounded px-3 py-2"
            value={reviewForm.item_type}
            onChange={(e) => setReviewForm(prev => ({ ...prev, item_type: e.target.value }))}
          >
            <option value="property">Property</option>
            <option value="hotel">Hotel</option>
            <option value="car">Car</option>
          </select>
          <input 
            className="w-full border rounded px-3 py-2" 
            placeholder="Item ID" 
            value={reviewForm.item_id}
            onChange={(e) => setReviewForm(prev => ({ ...prev, item_id: e.target.value }))}
          />
          <select 
            className="w-full border rounded px-3 py-2"
            value={reviewForm.service_type}
            onChange={(e) => setReviewForm(prev => ({ ...prev, service_type: e.target.value }))}
          >
            <option value="rent">Rent</option>
            <option value="purchase">Purchase</option>
            <option value="hire">Hire</option>
            <option value="accommodation">Accommodation</option>
          </select>
          <div className="flex space-x-2">
            {[1,2,3,4,5].map(star => (
              <button 
                key={star} 
                type="button" 
                className={`text-yellow-400 hover:text-yellow-500 ${star <= reviewForm.rating ? 'text-yellow-500' : ''}`}
                onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
              >
                <Star className="h-6 w-6" />
              </button>
            ))}
          </div>
          <textarea 
            className="w-full border rounded px-3 py-2" 
            placeholder="Your review" 
            rows={4}
            value={reviewForm.comment}
            onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
          />
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 rounded"
            disabled={loading.reviews}
          >
            {loading.reviews ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
        {error.reviews && <p className="text-red-500 text-sm mt-2">{error.reviews}</p>}
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowReviewModal(false)}>Close</button>
      </div>
    </div>
  );

  // Booking Modal
  const renderBookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Book Hotel</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('hotel_id', bookingForm.hotel_id);
          formData.append('room_id', bookingForm.room_id);
          formData.append('check_in_date', bookingForm.check_in_date);
          formData.append('check_out_date', bookingForm.check_out_date);
          formData.append('number_of_guests', bookingForm.number_of_guests);
          formData.append('special_requests', bookingForm.special_requests);
          await createBooking(formData);
        }} className="space-y-4">
          <input 
            className="w-full border rounded px-3 py-2" 
            placeholder="Hotel ID" 
            value={bookingForm.hotel_id}
            onChange={(e) => setBookingForm(prev => ({ ...prev, hotel_id: e.target.value }))}
          />
          <input 
            className="w-full border rounded px-3 py-2" 
            placeholder="Room ID" 
            value={bookingForm.room_id}
            onChange={(e) => setBookingForm(prev => ({ ...prev, room_id: e.target.value }))}
          />
          <input 
            className="w-full border rounded px-3 py-2" 
            type="date" 
            placeholder="Check-in Date"
            value={bookingForm.check_in_date}
            onChange={(e) => setBookingForm(prev => ({ ...prev, check_in_date: e.target.value }))}
          />
          <input 
            className="w-full border rounded px-3 py-2" 
            type="date" 
            placeholder="Check-out Date"
            value={bookingForm.check_out_date}
            onChange={(e) => setBookingForm(prev => ({ ...prev, check_out_date: e.target.value }))}
          />
          <input 
            className="w-full border rounded px-3 py-2" 
            placeholder="Number of Guests"
            value={bookingForm.number_of_guests}
            onChange={(e) => setBookingForm(prev => ({ ...prev, number_of_guests: e.target.value }))}
          />
          <textarea 
            className="w-full border rounded px-3 py-2" 
            placeholder="Special Requests"
            value={bookingForm.special_requests}
            onChange={(e) => setBookingForm(prev => ({ ...prev, special_requests: e.target.value }))}
          />
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 rounded"
            disabled={loading.bookings}
          >
            {loading.bookings ? 'Booking...' : 'Book Now'}
          </button>
        </form>
        {error.bookings && <p className="text-red-500 text-sm mt-2">{error.bookings}</p>}
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowBookingModal(false)}>Close</button>
      </div>
    </div>
  );

  // Car Hire Modal
  const renderCarHireModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Request Car Hire</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('car_id', carHireForm.car_id);
          formData.append('pickup_datetime', carHireForm.pickup_datetime);
          formData.append('return_datetime', carHireForm.return_datetime);
          formData.append('pickup_location', carHireForm.pickup_location);
          formData.append('dropoff_location', carHireForm.dropoff_location);
          formData.append('duration_in_days', carHireForm.duration_in_days);
          await createCarHire(formData);
        }} className="space-y-4">
          <input 
            className="w-full border rounded px-3 py-2" 
            placeholder="Car ID" 
            value={carHireForm.car_id}
            onChange={(e) => setCarHireForm(prev => ({ ...prev, car_id: e.target.value }))}
          />
          <input 
            className="w-full border rounded px-3 py-2" 
            type="datetime-local" 
            placeholder="Pickup Date & Time"
            value={carHireForm.pickup_datetime}
            onChange={(e) => setCarHireForm(prev => ({ ...prev, pickup_datetime: e.target.value }))}
          />
          <input 
            className="w-full border rounded px-3 py-2" 
            type="datetime-local" 
            placeholder="Return Date & Time"
            value={carHireForm.return_datetime}
            onChange={(e) => setCarHireForm(prev => ({ ...prev, return_datetime: e.target.value }))}
          />
          <input 
            className="w-full border rounded px-3 py-2" 
            placeholder="Pickup Location"
            value={carHireForm.pickup_location}
            onChange={(e) => setCarHireForm(prev => ({ ...prev, pickup_location: e.target.value }))}
          />
          <input 
            className="w-full border rounded px-3 py-2" 
            placeholder="Dropoff Location"
            value={carHireForm.dropoff_location}
            onChange={(e) => setCarHireForm(prev => ({ ...prev, dropoff_location: e.target.value }))}
          />
          <input 
            className="w-full border rounded px-3 py-2" 
            placeholder="Duration in Days"
            value={carHireForm.duration_in_days}
            onChange={(e) => setCarHireForm(prev => ({ ...prev, duration_in_days: e.target.value }))}
          />
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 rounded"
            disabled={loading.carHires}
          >
            {loading.carHires ? 'Requesting...' : 'Request Car'}
          </button>
        </form>
        {error.carHires && <p className="text-red-500 text-sm mt-2">{error.carHires}</p>}
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowCarHireModal(false)}>Close</button>
      </div>
    </div>
  );

  // Profile Modal
  const renderProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Update Profile</h2>
        <form className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Full Name" defaultValue={userProfile.name} />
          <input className="w-full border rounded px-3 py-2" placeholder="Email" defaultValue={userProfile.email} />
          <input className="w-full border rounded px-3 py-2" placeholder="Phone" defaultValue={userProfile.phone} />
          <input className="w-full border rounded px-3 py-2" type="file" accept="image/*" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Update Profile</button>
        </form>
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowProfileModal(false)}>Close</button>
      </div>
    </div>
  );

  // Password Modal
  const renderPasswordModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Change Password</h2>
        <form className="space-y-4">
          <input className="w-full border rounded px-3 py-2" type="password" placeholder="Current Password" />
          <input className="w-full border rounded px-3 py-2" type="password" placeholder="New Password" />
          <input className="w-full border rounded px-3 py-2" type="password" placeholder="Confirm New Password" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Change Password</button>
        </form>
        <button className="mt-6 text-gray-500 underline" onClick={() => setShowPasswordModal(false)}>Close</button>
      </div>
    </div>
  );

  // Property Detail View (stub)
  const renderPropertyDetail = (property: Property) => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
      {/* Property Details - Left Column */}
      <div className="xl:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {/* Property Image */}
          <div className="mb-4 sm:mb-6">
            <img
              src={property.image || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'}
              alt={property.title}
              className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
            />
          </div>
          {/* Property Info */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{property.title}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm sm:text-base">{property.property_type || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm sm:text-base">{property.property_category}</span>
              </div>
            </div>
            <div className="text-gray-500 text-sm mb-2">{property.address}</div>
            <div className="text-gray-500 text-sm mb-2">City: {property.city}</div>
            <div className="text-gray-500 text-sm mb-2">Price: {property.price}</div>
            <div className="text-gray-500 text-sm mb-2">Availability: {property.is_available ? 'Available' : 'Not Available'}</div>
          </div>
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 text-sm whitespace-pre-line">{property.description}</p>
          </div>
        </div>
      </div>
      {/* Right Column - Agent Card and Actions */}
      <div className="space-y-6">
        {/* Agent Card */}
        <div className="bg-green-500 text-white rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-1">Agent Name</h3>
          <p className="text-green-100 text-xs sm:text-sm mb-3 sm:mb-4">Role</p>
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <div className="flex justify-between items-center">
              <span className="text-green-100 text-xs sm:text-sm">Phone number</span>
              <span className="font-semibold text-xs sm:text-sm">+1234567890</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100 text-xs sm:text-sm">Email</span>
              <span className="font-semibold text-xs sm:text-sm">agent@example.com</span>
            </div>
          </div>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm mb-3">
            Send a mail
          </button>
        </div>
        {/* Documents */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="text-gray-700 text-sm sm:text-base">Contract documents</span>
            <button className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
              <span role="img" aria-label="download">⬇️</span>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="text-gray-700 text-sm sm:text-base">Receipts</span>
            <button className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
              <span role="img" aria-label="download">⬇️</span>
            </button>
          </div>
        </div>
        {/* Recent Maintenance */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent maintenance</h3>
          <div className="space-y-2 sm:space-y-3">
            {/* This section will be populated with actual maintenance data from the property's relationships */}
            {property.relationships?.maintenance?.data?.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center py-2">
                <span className="text-gray-700 text-xs sm:text-sm">{item.attributes.title}</span>
                <span className="text-xs text-gray-500">{item.attributes.date}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Rent Dates */}
        <div className="bg-white rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">Rent Start date</span>
            <span className="font-medium text-sm">N/A</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">Rent expiry date</span>
            <span className="font-medium text-sm">N/A</span>
          </div>
        </div>
        {/* Share & Add Maintenance */}
        <div className="flex space-x-2 mt-4">
          <button className="flex-1 bg-blue-500 text-white py-2 rounded" onClick={() => setShowShareModal(true)}>
            <Share2 className="inline-block mr-1" /> Share
          </button>
          <button className="flex-1 bg-green-500 text-white py-2 rounded" onClick={() => setShowAddMaintenanceModal(true)}>
            <Plus className="inline-block mr-1" /> Add Maintenance
          </button>
        </div>
      </div>
    </div>
  );

  // Main content for each tab
  let mainContent;
  if (activeTab === 'dashboard') {
    mainContent = (
      <>
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold">{properties.length}</div>
            <div className="text-xs text-gray-500">Total Properties</div>
            <div className="text-xs text-green-600 mt-1">Available for viewing</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold">{hotels.length}</div>
            <div className="text-xs text-gray-500">Available Hotels</div>
            <div className="text-xs text-gray-500 mt-1">Ready for booking</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold">{cars.length}</div>
            <div className="text-xs text-gray-500">Available Cars</div>
            <div className="text-xs text-gray-500 mt-1">Ready for hire</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold">{wishlist.length}</div>
            <div className="text-xs text-gray-500">Wishlist Items</div>
            <div className="text-xs text-gray-500 mt-1">Saved for later</div>
          </div>
        </div>

        {/* Properties Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Featured Properties</h2>
          {loading.properties ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading properties...</p>
            </div>
          ) : error.properties ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error.properties}</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No properties available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.slice(0, 6).map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => { setSelectedProperty(property); setActiveTab('property-detail'); }}>
                  <img src={property.image || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'} alt={property.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-semibold">₦{property.price}</span>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist('property', property.id.toString());
                        }}
                      >
                        <Heart className="h-5 w-5" />
              </button>
            </div>
                    </div>
                  </div>
              ))}
            </div>
          )}
        </div>

        {/* Hotels Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Available Hotels</h2>
          {loading.hotels ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading hotels...</p>
            </div>
          ) : error.hotels ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error.hotels}</p>
            </div>
          ) : hotels.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No hotels available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.slice(0, 6).map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <img src={hotel.images?.[0] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'} alt={hotel.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-semibold">₦{hotel.price}</span>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => addToWishlist('hotel', hotel.id.toString())}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>

        {/* Cars Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Available Cars</h2>
          {loading.cars ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading cars...</p>
            </div>
          ) : error.cars ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error.cars}</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No cars available</p>
          </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.slice(0, 6).map((car) => (
                <div key={car.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <img src={car.relationships?.files?.[0]?.attributes?.path || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'} alt={car.attributes.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{car.attributes.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{car.attributes.make} {car.attributes.model} ({car.attributes.year})</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-semibold">₦{car.attributes.price}</span>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => addToWishlist('car', car.id.toString())}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  } else if (activeTab === 'properties') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold mb-6">Properties list</h2>
        <div className="space-y-4">
          {properties.map((property) => (
            <div key={property.id} className="flex items-center justify-between p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded" onClick={() => { setSelectedProperty(property); setActiveTab('property-detail'); }}>
              <div className="flex items-center space-x-4">
                <img src={property.image || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'} alt={property.title} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{property.title}</h3>
                  <p className="text-xs text-gray-600 mb-1">{property.address}</p>
                  <p className="text-xs text-gray-500">Price: <span className="font-medium">{property.price}</span></p>
                  <p className="text-xs text-gray-500">Availability: <span className="font-medium">{property.is_available ? 'Available' : 'Not Available'}</span></p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
        <button className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg" onClick={() => setShowAddPropertyModal(true)}>
          <Plus className="h-6 w-6" />
        </button>
      </div>
    );
  } else if (activeTab === 'property-detail' && selectedProperty) {
    mainContent = renderPropertyDetail(selectedProperty);
  } else if (activeTab === 'maintenance') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold mb-6">Maintenance</h2>
        <div className="space-y-4">
          {/* This section will be populated with actual maintenance data from the property's relationships */}
          {selectedProperty?.relationships?.maintenance?.data?.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded">
              <div className="flex items-center space-x-4">
                <img src="https://via.placeholder.com/50" alt="Maintenance" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{item.attributes.title}</h3>
                  <p className="text-xs text-gray-600 mb-1">Date: <span className="font-medium">{item.attributes.date}</span></p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    );
  } else if (activeTab === 'subscription') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Subscription Management</h2>
          <button onClick={() => setShowSubscriptionModal(true)} className="bg-green-500 text-white px-4 py-2 rounded">Manage Plan</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Current Plan</h3>
            <p className="text-2xl font-bold text-green-600">{userProfile.subscription}</p>
            <p className="text-green-600 text-sm mt-2">Expires: {userProfile.subscriptionExpiry}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Benefits</h3>
            <ul className="text-blue-600 text-sm space-y-1">
              <li>• Unlimited property access</li>
              <li>• Priority customer support</li>
              <li>• Advanced booking features</li>
              <li>• Exclusive discounts</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (activeTab === 'wishlist') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
        {loading.wishlist ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading wishlist...</p>
          </div>
        ) : error.wishlist ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error.wishlist}</p>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No items in wishlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item: any) => (
              <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img src={item.image || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-green-600 font-semibold mb-3">{item.price}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-500 text-white py-2 rounded text-sm">Book Now</button>
                    <button 
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
                      onClick={() => removeFromWishlist(item.item_type, item.item_id)}
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else if (activeTab === 'reviews') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Reviews</h2>
          <button onClick={() => setShowReviewModal(true)} className="bg-green-500 text-white px-4 py-2 rounded">Add Review</button>
        </div>
        {loading.reviews ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        ) : error.reviews ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error.reviews}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review: any) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{review.item_name || 'Property'}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{review.created_at}</span>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteReview(review.item_type, review.item_id, review.service_type)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else if (activeTab === 'bookings') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Bookings</h2>
          <button onClick={() => setShowBookingModal(true)} className="bg-green-500 text-white px-4 py-2 rounded">Book Hotel</button>
        </div>
        {loading.bookings ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        ) : error.bookings ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error.bookings}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking: any) => (
              <div key={booking.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{booking.hotel_name || 'Hotel'}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Check-in:</span> {booking.check_in_date}
                  </div>
                  <div>
                    <span className="font-medium">Check-out:</span> {booking.check_out_date}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">${booking.amount || '0'}</span>
                  <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    onClick={() => payForBooking(booking.id)}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else if (activeTab === 'car-hire') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Car Hire</h2>
          <button onClick={() => setShowCarHireModal(true)} className="bg-green-500 text-white px-4 py-2 rounded">Request Car</button>
        </div>
        {loading.carHires ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading car hires...</p>
          </div>
        ) : error.carHires ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error.carHires}</p>
          </div>
        ) : carHires.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No car hires yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {carHires.map((hire: any) => (
              <div key={hire.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{hire.attributes.title || 'Car'}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    hire.attributes.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {hire.attributes.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Pickup:</span> {hire.attributes.pickup_datetime}
                  </div>
                  <div>
                    <span className="font-medium">Return:</span> {hire.attributes.return_datetime}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">${hire.attributes.price || '0'}</span>
                  <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    onClick={() => payForCarHire(hire.id.toString())}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else if (activeTab === 'profile') {
    mainContent = (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Profile Settings</h2>
          <button onClick={() => setShowProfileModal(true)} className="bg-green-500 text-white px-4 py-2 rounded">Edit Profile</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <img src={userProfile.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{userProfile.name}</h3>
                <p className="text-gray-600">{userProfile.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900">{userProfile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{userProfile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900">{userProfile.phone}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Subscription Status</h4>
              <p className="text-green-600">{userProfile.subscription} Plan</p>
              <p className="text-green-600 text-sm">Expires: {userProfile.subscriptionExpiry}</p>
            </div>
            <button onClick={() => setShowPasswordModal(true)} className="w-full bg-blue-500 text-white py-2 rounded">
              Change Password
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <a href="#" className="hover:text-green-500">Property management</a>
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
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left font-semibold ${
                activeTab === 'dashboard'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleTabChange('dashboard')}
            >
              <span>Dashboard</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'properties'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleTabChange('properties')}
            >
              <span>Properties</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'maintenance'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleTabChange('maintenance')}
            >
              <span>Maintenance</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'subscription'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleTabChange('subscription')}
            >
              <CreditCard className="h-4 w-4" />
              <span>Subscription</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'wishlist'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleTabChange('wishlist')}
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'reviews'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleTabChange('reviews')}
            >
              <Star className="h-4 w-4" />
              <span>Reviews</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'bookings'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleTabChange('bookings')}
            >
              <Calendar className="h-4 w-4" />
              <span>Bookings</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'car-hire'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleTabChange('car-hire')}
            >
              <Car className="h-4 w-4" />
              <span>Car Hire</span>
            </button>
            <button
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left ${
                activeTab === 'profile'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => handleTabChange('profile')}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
            <button
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
              onClick={() => window.location.reload()}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        {/* Main Content Area */}
        <main className="flex-1">{mainContent}</main>
      </div>
      {/* Modals */}
      {showShareModal && selectedProperty && (
        <ShareLinkModal propertyName={selectedProperty.title} onClose={() => setShowShareModal(false)} />
      )}
      {showAddPropertyModal && renderAddPropertyModal()}
      {showAddMaintenanceModal && renderAddMaintenanceModal()}
      {showSubscriptionModal && renderSubscriptionModal()}
      {showReviewModal && renderReviewModal()}
      {showBookingModal && renderBookingModal()}
      {showCarHireModal && renderCarHireModal()}
      {showProfileModal && renderProfileModal()}
      {showPasswordModal && renderPasswordModal()}
    </div>
  );
};

export default MultiPropertyDashboard; 