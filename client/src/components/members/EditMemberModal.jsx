import React, { useState, useEffect } from 'react';

const EditMemberModal = ({ member, onClose, onSave }) => {
  // Initialize form state with the member's data
  const [formData, setFormData] = useState({ ...member });

  useEffect(() => {
    // Update form data if the member prop changes
    setFormData({ ...member });
  }, [member]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the updated data to the onSave function
  };

  return (
    // Modal backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal content */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <select
            name="membershipType"
            value={formData.membershipType}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </select>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;