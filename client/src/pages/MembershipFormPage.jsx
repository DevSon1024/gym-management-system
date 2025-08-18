import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createRequest } from '../api/gymApi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const MembershipFormPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { plan, paymentId } = state || {};
  
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    healthConditions: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  if (!plan || !paymentId) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">Invalid session. Please complete payment first.</h2>
      </div>
    );
  }

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest({
        planId: plan._id,
        paymentId,
        memberDetails: formData,
      });
      alert('Your membership request has been submitted successfully! The admin will review it shortly.');
      navigate('/user-dashboard');
    } catch (error) {
      alert(error.response?.data?.msg || 'Failed to submit request.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-2">Membership Request Form</h2>
            <p className="mb-6 text-gray-600">You've successfully paid for the <span className="font-bold text-blue-600">{plan.planName}</span> plan. Please fill out the form below to submit your membership request.</p>
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
                <Button type="submit">Submit Request</Button>
            </div>
            </form>
        </div>
    </div>
  );
};

export default MembershipFormPage;