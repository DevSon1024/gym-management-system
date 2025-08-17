import React, { useState, useEffect } from 'react';
import { getMyProfile, getAllPlans, getAllTrainers } from '../api/gymApi';
import { useAuth } from '../context/AuthContext';

const UserDashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getMyProfile();
        setProfile(profileRes.data);

        const plansRes = await getAllPlans();
        setPlans(plansRes.data);

        const trainersRes = await getAllTrainers();
        setTrainers(trainersRes.data);
      } catch (error) {
        console.error("Error fetching user dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 sm:p-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome, {user?.name || 'User'}!</h1>
      
      {/* Membership Details */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Your Membership</h2>
        {profile ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-blue-200 text-sm">Plan</p>
              <p className="text-xl font-bold">{profile.membershipType}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">Start Date</p>
              <p className="text-xl font-bold">{new Date(profile.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">End Date</p>
              <p className="text-xl font-bold">{new Date(profile.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        ) : <p>Loading your details...</p>}
      </div>

      {/* Available Plans */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan._id} className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-600">{plan.planName}</h3>
              <p className="text-3xl font-extrabold my-3">${plan.price}</p>
              <p className="text-gray-500 mb-3">{plan.duration}</p>
              <p className="text-sm">{plan.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Trainers */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Trainers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map(trainer => (
            <div key={trainer._id} className="bg-white text-center p-6 rounded-2xl shadow-lg">
              <img src={trainer.imageUrl} alt={trainer.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="font-bold">{trainer.name}</h3>
              <p className="text-sm text-blue-500">{trainer.expertise}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;