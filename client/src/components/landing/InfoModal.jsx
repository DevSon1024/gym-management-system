import React from 'react';
import { Link } from 'react-router-dom';

const InfoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Get Full Access</h2>
        <p className="text-gray-600 mb-6">
          To view more details and manage your fitness journey, please log in or create an account.
        </p>
        <div className="flex flex-col space-y-3">
          <Link to="/register" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Register Now
          </Link>
          <Link to="/login" className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300">
            Login
          </Link>
        </div>
        <button onClick={onClose} className="mt-6 text-sm text-gray-500 hover:underline">
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default InfoModal;