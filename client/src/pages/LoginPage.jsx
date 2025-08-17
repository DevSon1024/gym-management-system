import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const userRole = await login(formData);
      // Redirect based on role
      if (userRole === 'admin') {
        navigate('/dashboard'); // Admin dashboard
      } else {
        navigate('/user-dashboard'); // User dashboard
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
        {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <Input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email Address" required />
          <Input type="password" name="password" value={formData.password} onChange={onChange} placeholder="Password" required />
          <Button type="submit">Sign In</Button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;