import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const AddMembershipModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    membershipType: 'Basic',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    height: '',
    weight: '',
    healthConditions: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const { membershipType, startDate, endDate, height, weight, healthConditions, emergencyContactName, emergencyContactPhone } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user._id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
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
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input type="date" name="startDate" value={startDate} onChange={onChange} required />
            <Input type="date" name="endDate" value={endDate} onChange={onChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input type="number" name="height" value={height} onChange={onChange} placeholder="Height (cm)" required />
            <Input type="number" name="weight" value={weight} onChange={onChange} placeholder="Weight (kg)" required />
          </div>
          <Input name="healthConditions" value={healthConditions} onChange={onChange} placeholder="Any health conditions? (e.g., Asthma, Diabetes)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="emergencyContactName" value={emergencyContactName} onChange={onChange} placeholder="Emergency Contact Name" required />
            <Input name="emergencyContactPhone" value={emergencyContactPhone} onChange={onChange} placeholder="Emergency Contact Phone" required />
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