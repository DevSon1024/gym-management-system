import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const MemberForm = ({ onMemberAdded }) => {
  const [formData, setFormData] = useState({
    name: '', age: '', contact: '', membershipType: 'Basic', startDate: '', endDate: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // This function will be passed down from the parent page
    onMemberAdded(formData);
    // Clear the form
    setFormData({ name: '', age: '', contact: '', membershipType: 'Basic', startDate: '', endDate: '' });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-5 text-gray-700 border-b pb-3">Add New Member</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
        <Input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" required />
        <Input type="text" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Contact (Phone)" required />
        <select name="membershipType" value={formData.membershipType} onChange={handleInputChange} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Start Date</label>
          <Input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">End Date</label>
          <Input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <Button type="submit">Add Member</Button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;