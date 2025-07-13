import React, { useState } from 'react';
import { Upload, X, Star, Phone, MessageSquare } from 'lucide-react';

const CarHireSystem: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const UploadCarModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Upload a car for hire</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{currentStep}/2</p>
            </div>
            <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {currentStep === 1 ? (
              <>
                <input
                  type="text"
                  placeholder="Car name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Brand name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Type</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Hatchback</option>
                  <option>Coupe</option>
                </select>
                <textarea
                  placeholder="Car description"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
                <button
                  onClick={() => setCurrentStep(2)}
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
                  <input type="file" multiple accept="image/*" className="hidden" id="car-images" />
                  <label htmlFor="car-images" className="cursor-pointer text-green-600 hover:text-green-700">
                    Upload Images
                  </label>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload video (optional)</p>
                  <input type="file" accept="video/*" className="hidden" id="car-video" />
                  <label htmlFor="car-video" className="cursor-pointer text-green-600 hover:text-green-700">
                    Upload Video
                  </label>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload Document (optional)</p>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="car-docs" />
                  <label htmlFor="car-docs" className="cursor-pointer text-green-600 hover:text-green-700">
                    Upload Documents
                  </label>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
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
        <h2 className="text-xl font-semibold text-gray-900">Car Hire System</h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Upload Car
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Car Details */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
                alt="Executive car"
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
                    src={`https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop`}
                    alt={`Car view ${i}`}
                    className="w-12 h-12 rounded object-cover border-2 border-white"
                  />
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Uyo, Akwa Ibom, Nigeria</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Executive room</h2>
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

              {/* Car Features */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-800 rounded-full mx-auto mb-2"></div>
                  <span className="text-sm text-gray-600">Foreign used</span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <span className="text-sm text-gray-600">Automatic</span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                  <span className="text-sm text-gray-600">Yellow</span>
                </div>
              </div>

              <div className="flex space-x-8 border-b border-gray-200 mb-6">
                <button className="pb-2 text-green-600 border-b-2 border-green-600 font-medium">
                  Car details
                </button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">Video</button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">Document</button>
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

        {/* Property Agent Card */}
        <div className="space-y-4">
          <div className="bg-green-500 text-white rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-1">Property Agent</h3>
            
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                alt="Agent"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-green-100 text-sm">+234-803-456-7890</p>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between items-center">
                <span className="text-green-100 text-xs sm:text-sm">Daily Rate</span>
                <span className="font-semibold text-xs sm:text-sm">$50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100 text-xs sm:text-sm">Weekly Rate</span>
                <span className="font-semibold text-xs sm:text-sm">$300</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100 text-xs sm:text-sm">Monthly Rate</span>
                <span className="font-semibold text-xs sm:text-sm">$1,200</span>
              </div>
            </div>
            
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm mb-3 flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </button>

            <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm flex items-center justify-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Send Message Now</span>
            </button>
          </div>
        </div>
      </div>

      {showUploadModal && <UploadCarModal />}
    </div>
  );
};

export default CarHireSystem;