import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const EditMemberModal = ({ member, plans, onClose, onSave }) => { // Accept plans as a prop
  const [formData, setFormData] = useState({
    membershipType: member.membershipType || '',
    endDate: member.endDate ? new Date(member.endDate).toISOString().split('T')[0] : ''
  });

  useEffect(() => {
    setFormData({
      membershipType: member.membershipType || '',
      endDate: member.endDate ? new Date(member.endDate).toISOString().split('T')[0] : ''
    });
  }, [member]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...member, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Edit Membership</h2>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p><strong>Member:</strong> {member.user.name}</p>
            <p><strong>Contact:</strong> {member.user.contact}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Plan Type</label>
                <select
                    name="membershipType"
                    value={formData.membershipType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                >
                    {/* Dynamically generate options from the plans list */}
                    {plans.map(plan => (
                        <option key={plan._id} value={plan.planName}>
                            {plan.planName}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Membership End Date</label>
                <Input 
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                />
            </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;