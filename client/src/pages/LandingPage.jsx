import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPlans, getAllTrainers, createRequest } from '../api/gymApi';
import PlanCard from '../components/landing/PlanCard';
import TrainerCard from '../components/landing/TrainerCard';
import InfoModal from '../components/landing/InfoModal';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plansRes = await getAllPlans();
        setPlans(plansRes.data);
        const trainersRes = await getAllTrainers();
        setTrainers(trainersRes.data);
      } catch (error) {
        console.error("Failed to fetch landing page data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDetailsClick = async (planId) => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    try {
      if (window.confirm('You are about to send a membership request for this plan. Proceed?')) {
        await createRequest(planId);
        alert('Your request has been sent successfully! The admin will review it shortly.');
      }
    } catch (error) {
      alert(error.response?.data?.msg || 'Failed to send request.');
    }
  };

  return (
    <>
      {showModal && <InfoModal onClose={() => setShowModal(false)} />}
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800">
            Achieve Your <span className="text-blue-600">Fitness Goals</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            The all-in-one solution to manage your members, trainers, and plans with ease and efficiency.
          </p>
          <div className="mt-8">
            <Link to="/register" className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Join Now
            </Link>
          </div>
        </div>
      </div>
      
      {/* Plans Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Our Membership Plans</h2>
          <div className="flex overflow-x-auto space-x-8 pb-4">
            {plans.map(plan => (
              <PlanCard key={plan._id} plan={plan} onDetailsClick={() => handleDetailsClick(plan._id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Trainers Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Meet Our Expert Trainers</h2>
          <div className="flex overflow-x-auto space-x-8 pb-4">
            {trainers.map(trainer => (
              <TrainerCard key={trainer._id} trainer={trainer} onDetailsClick={() => !isAuthenticated && setShowModal(true)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;