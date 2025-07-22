import React from 'react';
import { Plus } from 'lucide-react';
import { apiRequestWithAuth } from '../../utils/api';

type Room = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  images?: string[];
};

type RoomModalsProps = {
  hotelId: number | null;
  onClose: () => void;
};

const RoomModals: React.FC<RoomModalsProps> = ({ hotelId, onClose }) => {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [roomsLoading, setRoomsLoading] = React.useState(false);
  const [roomsError, setRoomsError] = React.useState('');
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [roomForm, setRoomForm] = React.useState<Partial<Room>>({});
  const [roomEditId, setRoomEditId] = React.useState<number | null>(null);
  const [roomImageFiles, setRoomImageFiles] = React.useState<FileList | null>(null);
  const [roomLoading, setRoomLoading] = React.useState(false);
  const [roomFormError, setRoomFormError] = React.useState('');

  const fetchRooms = async () => {
    if (!hotelId) return;
    
    setRoomsLoading(true);
    setRoomsError('');
    try {
      const response = await apiRequestWithAuth('GET', `/manager/hotel/${hotelId}/rooms`);
      setRooms(response.data || []);
    } catch (err: any) {
      setRoomsError(err?.message || 'Failed to fetch rooms.');
    } finally {
      setRoomsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRoomForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRoomImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setRoomImageFiles(e.target.files);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelId) return;
    
    setRoomLoading(true);
    setRoomFormError('');
    const formData = new FormData();
    Object.entries(roomForm).forEach(([k, v]) => formData.append(k, String(v)));
    if (roomImageFiles) {
      Array.from(roomImageFiles).forEach((file) => formData.append('images[]', file));
    }
  
    try {
      await apiRequestWithAuth('POST', `/manager/hotel/${hotelId}/rooms`, formData, true);
      setShowCreateModal(false);
      setRoomForm({});
      setRoomImageFiles(null);
      await fetchRooms();
    } catch (err: any) {
      setRoomFormError(err?.message || 'Failed to create room.');
    } finally {
      setRoomLoading(false);
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    
    setRoomLoading(true);
    setRoomFormError('');
    try {
      await apiRequestWithAuth('DELETE', `/manager/hotel/rooms/${roomId}`);
      await fetchRooms();
    } catch (err: any) {
      setRoomFormError(err?.message || 'Failed to delete room.');
    } finally {
      setRoomLoading(false);
    }
  };

  const CreateRoomModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Create a room</h2>
        {roomFormError && <div className="text-red-500 mb-4">{roomFormError}</div>}
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <input
            name="name"
            value={roomForm.name || ''}
            onChange={handleRoomChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Room name"
            required
          />
          <input
            name="category"
            value={roomForm.category || ''}
            onChange={handleRoomChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Room Categories"
            required
          />
          <input
            name="price"
            value={roomForm.price || ''}
            onChange={handleRoomChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Price"
            required
          />
          <textarea
            name="description"
            value={roomForm.description || ''}
            onChange={handleRoomChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Room description"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleRoomImageChange}
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            disabled={roomLoading}
            className="w-full bg-green-600 text-white py-2 rounded mt-4"
          >
            {roomLoading ? 'Creating...' : 'Create'}
          </button>
        </form>
        <button
          className="mt-6 text-gray-500 underline"
          onClick={() => setShowCreateModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );

  if (!hotelId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Manage Rooms</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="mb-6 bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" /> <span>Add Room</span>
        </button>

        {roomsError && <div className="text-red-500 mb-4">{roomsError}</div>}

        {roomsLoading ? (
          <div className="text-center py-12 text-gray-500">Loading rooms...</div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No rooms found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-4">
                {room.images?.[0] && (
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">₦{room.price}</span>
                  <span className="text-sm text-gray-500">{room.category}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => { setRoomEditId(room.id); setRoomForm(room); }}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && <CreateRoomModal />}
      </div>
    </div>
  );
};

export default RoomModals;