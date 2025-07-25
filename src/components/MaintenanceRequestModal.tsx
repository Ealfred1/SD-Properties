import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { TenantData } from '../types/auth';
import { apiRequest } from '../utils/api';

interface MaintenanceRequestModalProps {
  onClose: () => void;
  tenantData: TenantData;
}

const MaintenanceRequestModal: React.FC<MaintenanceRequestModalProps> = ({ onClose, tenantData }) => {
  // Extract tenant info from new structure
  const user = tenantData.user;
  const userAttr = user.attributes || {};
  const unit = user.relationships?.unit;
  const unitAttr = unit?.attributes || {};

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('priority', formData.priority);
      data.append('name', userAttr.name || '');
      data.append('phone', userAttr.phone || '');
      data.append('flat', unitAttr.name || '');
      if (files) {
        Array.from(files).forEach((file, idx) => {
          data.append(`photos[${idx}]`, file);
        });
      }
      const token = localStorage.getItem('tenantToken') || '';
      await apiRequest('POST', '/tenants/request-maintenance', data, token, true);
      setSuccess(true);
      setTimeout(() => {
        setSubmitting(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      setError('Failed to submit maintenance request.');
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Send a mail</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Fill in details below to request maintenance</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={userAttr.name || ''}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={userAttr.phone || ''}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="flat"
              value={unitAttr.name || ''}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title (e.g. Bad Tap)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          {/* Photo Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Upload photos of the issue</p>
            <p className="text-xs text-gray-500">(Optional)</p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="photo-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="photo-upload"
              className="mt-2 inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-sm"
            >
              Choose Photos
            </label>
            {files && files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 justify-center">
                {Array.from(files).map((file, idx) => (
                  <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">{file.name}</span>
                ))}
              </div>
            )}
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">Request submitted successfully!</div>}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceRequestModal;