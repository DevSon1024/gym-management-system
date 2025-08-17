import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const PlanForm = ({ onPlanAdded }) => {
  const [formData, setFormData] = useState({ planName: '', duration: '', price: '', description: '' });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const planData = new FormData();
    planData.append('planName', formData.planName);
    planData.append('duration', formData.duration);
    planData.append('price', formData.price);
    planData.append('description', formData.description);
    if (image) {
      planData.append('image', image);
    }
    onPlanAdded(planData);
    setFormData({ planName: '', duration: '', price: '', description: '' });
    setImage(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-5 text-gray-700 border-b pb-3">Add New Plan</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="planName" value={formData.planName} onChange={handleInputChange} placeholder="Plan Name (e.g., Gold)" required />
        <Input name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Duration (e.g., 3 Months)" required />
        <Input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price (₹)" required />
        <Input name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Plan Image</label>
          <input type="file" name="image" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Add Plan</Button>
        </div>
      </form>
    </div>
  );
};

export default PlanForm;