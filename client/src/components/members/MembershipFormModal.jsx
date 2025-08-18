import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const MembershipFormModal = ({ plan, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    healthConditions: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-2">Membership Application</h2>
        <p className="mb-6 text-gray-600">You're applying for membership with the <span className="font-bold text-blue-600">{plan.planName}</span> plan.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input type="number" name="height" value={formData.height} onChange={onChange} placeholder="Height (cm)" required />
            <Input type="number" name="weight" value={formData.weight} onChange={onChange} placeholder="Weight (kg)" required />
          </div>
          <Input name="healthConditions" value={formData.healthConditions} onChange={onChange} placeholder="Any health conditions? (e.g., Asthma, Diabetes)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="emergencyContactName" value={formData.emergencyContactName} onChange={onChange} placeholder="Emergency Contact Name" required />
            <Input name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={onChange} placeholder="Emergency Contact Phone" required />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembershipFormModal;