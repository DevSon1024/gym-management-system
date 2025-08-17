import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const TrainerForm = ({ onTrainerAdded }) => {
  const [formData, setFormData] = useState({ name: '', expertise: '', contact: '', bio: '' });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trainerData = new FormData();
    trainerData.append('name', formData.name);
    trainerData.append('expertise', formData.expertise);
    trainerData.append('contact', formData.contact);
    trainerData.append('bio', formData.bio);
    if (image) {
      trainerData.append('image', image);
    }
    onTrainerAdded(trainerData);
    setFormData({ name: '', expertise: '', contact: '', bio: '' }); // Clear form
    setImage(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-5 text-gray-700 border-b pb-3">Add New Trainer</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
        <Input name="expertise" value={formData.expertise} onChange={handleInputChange} placeholder="Expertise (e.g., Yoga)" required />
        <Input name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Contact Info" required />
        <Input name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Short Bio" />
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Trainer Image</label>
          <input type="file" name="image" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Add Trainer</Button>
        </div>
      </form>
    </div>
  );
};

export default TrainerForm;