import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const PlanForm = ({ onPlanAdded }) => {
  const [formData, setFormData] = useState({ planName: '', duration: '', price: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlanAdded(formData);
    setFormData({ planName: '', duration: '', price: '' }); // Clear form
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-5 text-gray-700 border-b pb-3">Add New Plan</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input type="text" name="planName" value={formData.planName} onChange={handleInputChange} placeholder="Plan Name (e.g., Gold)" required />
        <Input type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Duration (e.g., 3 Months)" required />
        <Input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price (₹)" required />
        <div className="md:col-span-3">
          <Button type="submit">Add Plan</Button>
        </div>
      </form>
    </div>
  );
};

export default PlanForm;