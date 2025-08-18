import React, { useState } from 'react';
import Button from '../common/Button';

const AddMembershipModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    membershipType: 'Basic',
    startDate: new Date().toISOString().split('T')[0], // Today's date
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0] // 1 month from today
  });

  const { membershipType, startDate, endDate } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user._id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add Membership for {user.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Membership Type</label>
            <select name="membershipType" value={membershipType} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" name="startDate" value={startDate} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input type="date" name="endDate" value={endDate} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
            <Button type="submit">Save Membership</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMembershipModal;