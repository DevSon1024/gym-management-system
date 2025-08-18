import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const EditPlanModal = ({ plan, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...plan });
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
    for (const key in formData) {
      planData.append(key, formData[key]);
    }
    if (image) {
      planData.append('image', image);
    }
    onSave(planData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">Edit Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="planName" value={formData.planName} onChange={handleInputChange} placeholder="Plan Name" required />
          <Input name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Duration" required />
          <Input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" required />
          <Input name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Update Image (optional)</label>
            <input type="file" name="image" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlanModal;