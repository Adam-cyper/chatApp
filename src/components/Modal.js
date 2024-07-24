import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose,socket }) => {
    const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [groupId, setGroupId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
        if(username !== "" && groupId!==""){
            socket.emit("join_room",groupId)
        }
    onClose();
    navigate(`/chat/${username}/${groupId}`,{replace:true})
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">User Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="groupId" className="block text-sm font-medium text-gray-700">Group ID</label>
            <input
              type="text"
              id="groupId"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Join Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
