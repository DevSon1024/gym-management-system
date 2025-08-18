import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, getAllPlans, getMyLatestReceipt } from '../api/gymApi';
import { useAuth } from '../context/AuthContext';
import MembershipFormModal from '../components/members/MembershipFormModal';
import Button from '../components/common/Button';

// This is the view for an active member
const MemberView = ({ profile }) => {
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await getMyLatestReceipt();
        setReceipt(res.data);
      } catch (error) {
        console.error("Failed to fetch receipt:", error);
      }
    };
    fetchReceipt();
  }, []);

  const handleViewReceipt = () => {
    navigate('/receipt', { state: { receipt } });
  };

  return (
    <>
      {/* Membership Details */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Your Membership</h2>
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
          </div>
          {receipt && (
            <button onClick={handleViewReceipt} className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
              View Receipt
            </button>
          )}
        </div>
      </div>
      
      {/* Plan Details Section */}
      {receipt?.planDetails && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Plan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img src={`http://localhost:5000${receipt.planDetails.imageUrl}`} alt={receipt.planDetails.planName} className="w-full h-48 object-cover rounded-lg mb-4"/>
            </div>
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-blue-600">{receipt.planDetails.planName}</h4>
              <p className="text-gray-600">{receipt.planDetails.description}</p>
              <p className="text-2xl font-extrabold">₹{receipt.planDetails.price} <span className="text-base font-normal text-gray-500">/ {receipt.planDetails.duration}</span></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// This is the view for a user who is not yet a member
const NonMemberView = ({ plans }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">You're not a member yet!</h2>
        <p className="text-gray-600">Choose one of our plans below to get started on your fitness journey.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan._id} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col">
            <img src={`http://localhost:5000${plan.imageUrl}`} alt={plan.planName} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-blue-600">{plan.planName}</h3>
            <p className="text-3xl font-extrabold my-3">₹{plan.price}</p>
            <p className="text-gray-500 mb-3">{plan.duration}</p>
            <p className="text-sm flex-grow">{plan.description}</p>
            <button onClick={() => handlePlanClick(plan)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <MembershipFormModal plan={selectedPlan} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};


const UserDashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getMyProfile();
        setProfile(profileRes.data);
        setIsMember(true);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsMember(false);
          const plansRes = await getAllPlans();
          setPlans(plansRes.data);
        } else {
          console.error("Error fetching user dashboard data:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading your dashboard...</div>;
  }

  return (
    <div className="p-4 sm:p-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome, {user?.name || 'User'}!</h1>
      {isMember ? <MemberView profile={profile} /> : <NonMemberView plans={plans} />}
    </div>
  );
};

export default UserDashboardPage;