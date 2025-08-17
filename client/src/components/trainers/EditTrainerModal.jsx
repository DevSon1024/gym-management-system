import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const EditTrainerModal = ({ trainer, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...trainer });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">Edit Trainer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
          <Input name="expertise" value={formData.expertise} onChange={handleInputChange} placeholder="Expertise" required />
          <Input name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Contact" required />
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainerModal;