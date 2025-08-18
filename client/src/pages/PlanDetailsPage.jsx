import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlanById } from '../api/gymApi';

const PlanDetailsPage = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getPlanById(id);
        setPlan(res.data);
      } catch (error) {
        console.error("Failed to fetch plan details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!plan) return <p className="text-center p-10">Plan not found.</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img 
            src={`http://localhost:5000${plan.imageUrl}`} 
            alt={plan.planName} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">{plan.planName}</h1>
            <p className="text-5xl font-extrabold my-4 text-gray-800">₹{plan.price}</p>
            <p className="text-gray-500 mb-4 text-lg">{plan.duration}</p>
            <p className="text-gray-700">{plan.description}</p>
          </div>
          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Ready to Join?</h2>
            <p className="text-gray-600 my-3">Create an account or sign in to purchase this plan and start your fitness journey with us!</p>
            <div className="flex flex-col space-y-3">
              <Link to="/register" className="w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                Register Now
              </Link>
              <Link to="/login" className="w-full text-center bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsPage;