import React, { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

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
        onClick={handleNext}
        disabled={!paymentMethod}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
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
        onClick={handleNext}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Upload
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="space-y-4">
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="Card number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <select
          name="cardName"
          value={formData.cardName}
          onChange={(e) => setFormData({...formData, cardName: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Card name</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="5/2025"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="Cvv"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
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
            <span className="font-medium">089854456786</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className="text-gray-900">Payment amount</span>
            <span className="text-gray-900">$200,000</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center my-6">
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="white"/>
              <g fill="black">
                <rect x="0" y="0" width="7" height="7"/>
                <rect x="14" y="0" width="7" height="7"/>
                <rect x="28" y="0" width="7" height="7"/>
                <rect x="42" y="0" width="7" height="7"/>
                <rect x="56" y="0" width="7" height="7"/>
                <rect x="70" y="0" width="7" height="7"/>
                <rect x="84" y="0" width="7" height="7"/>
                <rect x="0" y="14" width="7" height="7"/>
                <rect x="28" y="14" width="7" height="7"/>
                <rect x="56" y="14" width="7" height="7"/>
                <rect x="84" y="14" width="7" height="7"/>
                <rect x="0" y="28" width="7" height="7"/>
                <rect x="14" y="28" width="7" height="7"/>
                <rect x="42" y="28" width="7" height="7"/>
                <rect x="70" y="28" width="7" height="7"/>
                <rect x="84" y="28" width="7" height="7"/>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Pay
      </button>
    </div>
  );

  const getTitle = () => {
    switch (currentStep) {
      case 1: return 'Select a payment option';
      case 2: return 'Select a payment option';
      case 3: return 'Book a hotel';
      case 4: return 'Hotel receipt';
      default: return 'Payment';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{getTitle()}</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Fill in details below to book a hotel room</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default PaymentModal;