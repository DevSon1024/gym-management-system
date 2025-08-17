import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const TrainerForm = ({ onTrainerAdded }) => {
  const [formData, setFormData] = useState({ name: '', expertise: '', contact: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTrainerAdded(formData);
    setFormData({ name: '', expertise: '', contact: '' }); // Clear form
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-5 text-gray-700 border-b pb-3">Add New Trainer</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
        <Input type="text" name="expertise" value={formData.expertise} onChange={handleInputChange} placeholder="Expertise (e.g., Yoga, Weightlifting)" required />
        <Input type="text" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Contact Info" required />
        <div className="md:col-span-3">
          <Button type="submit">Add Trainer</Button>
        </div>
      </form>
    </div>
  );
};

export default TrainerForm;