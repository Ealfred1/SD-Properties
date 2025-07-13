import React, { useState } from 'react';
import { X, Copy, Share2, Link } from 'lucide-react';

interface ShareLinkModalProps {
  onClose: () => void;
  propertyName: string;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ onClose, propertyName }) => {
  const [email, setEmail] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Generate a unique share link (in real app, this would come from backend)
  const shareLink = `https://saintdavies.com/property/view/${propertyName.toLowerCase().replace(' ', '-')}-${Math.random().toString(36).substr(2, 9)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleEmailShare = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email sharing logic
    console.log('Sharing link via email to:', email);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Share link</h2>
            <p className="text-sm text-gray-600 mt-1">Share link for users to access dashboard</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share link
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-600 truncate">
                {shareLink}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center space-x-1"
              >
                <Copy className="h-4 w-4" />
                <span className="text-sm">{linkCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Email Sharing */}
          <form onSubmit={handleEmailShare} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Can view
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-sm text-gray-700">Dashboard</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-sm text-gray-700">Properties</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-sm text-gray-700">Edit</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;