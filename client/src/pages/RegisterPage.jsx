import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', age: '', contact: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, age, contact } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register({ name, email, password, age, contact });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Your Account</h2>
        {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
        {success && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <Input name="name" value={name} onChange={onChange} placeholder="Full Name" required />
          <Input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address" required />
          <Input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
          <Input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm Password" required />
          <Input type="number" name="age" value={age} onChange={onChange} placeholder="Age" required />
          <Input name="contact" value={contact} onChange={onChange} placeholder="Contact Number" required />
          <Button type="submit">Register</Button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;