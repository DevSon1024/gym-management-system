import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import ImageDropzone from '../common/ImageDropzone';

const PlanForm = ({ onPlanAdded }) => {
  const [formData, setFormData] = useState({ planName: '', price: '', description: '' });
  const [durationValue, setDurationValue] = useState(1);
  const [durationUnit, setDurationUnit] = useState('Months');
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const planData = new FormData();
    planData.append('planName', formData.planName);
    planData.append('duration', `${durationValue} ${durationUnit}`);
    planData.append('price', formData.price);
    planData.append('description', formData.description);
    if (image) {
      planData.append('image', image);
    }
    onPlanAdded(planData);
    setFormData({ planName: '', price: '', description: '' });
    setDurationValue(1);
    setDurationUnit('Months');
    setImage(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-5 text-gray-700 border-b pb-3">Add New Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input name="planName" value={formData.planName} onChange={handleInputChange} placeholder="Plan Name (e.g., Gold)" required />
          <Input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price (₹)" required />
          <div className="flex items-center gap-2">
            <Input type="number" name="durationValue" value={durationValue} onChange={(e) => setDurationValue(e.target.value)} placeholder="Duration" required />
            <select value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
              <option>Days</option>
              <option>Months</option>
              <option>Years</option>
            </select>
          </div>
          <Input name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Plan Image</label>
          <ImageDropzone onFileChange={setImage} />
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Add Plan</Button>
        </div>
      </form>
    </div>
  );
};

export default PlanForm;