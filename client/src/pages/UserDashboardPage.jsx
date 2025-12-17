import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, getAllPlans, getMyLatestReceipt, getMyPendingRequest, createRequest } from '../api/gymApi';
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
      {/* --- New Membership Status Card --- */}
      <div className="bg-green-500 text-white p-4 rounded-2xl shadow-lg mb-8 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-semibold">You are an Active Member</h2>
      </div>

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

// ... (PaidUserView and NonPaidUserView components remain unchanged) ...

const PaidUserView = ({ receipt, hasPendingRequest, onApplyClick }) => {
    const navigate = useNavigate();
    const handleViewReceipt = () => navigate('/receipt', { state: { receipt } });

    return (
        <>
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Your Purchased Plan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div><p className="text-blue-200 text-sm">Plan</p><p className="text-xl font-bold">{receipt.planDetails.planName}</p></div>
                            <div><p className="text-blue-200 text-sm">Price</p><p className="text-xl font-bold">₹{receipt.planDetails.price}</p></div>
                            <div><p className="text-blue-200 text-sm">Duration</p><p className="text-xl font-bold">{receipt.planDetails.duration}</p></div>
                        </div>
                    </div>
                    <button onClick={handleViewReceipt} className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">View Receipt</button>
                </div>
            </div>
            
            {hasPendingRequest ? (
                <div className="text-center bg-yellow-100 text-yellow-800 p-4 rounded-lg">Your membership application is pending approval.</div>
            ) : (
                <div className="text-center"><Button onClick={onApplyClick}>Apply for Membership</Button></div>
            )}
        </>
    );
};

const NonPaidUserView = ({ plans }) => {
  const navigate = useNavigate();
  const handlePlanClick = (plan) => navigate('/payment', { state: { plan } });

  return (
    <>
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">You have no active plan!</h2>
        <p className="text-gray-600">Choose one of our plans below to get started.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan._id} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col">
            <img src={`http://localhost:5000${plan.imageUrl}`} alt={plan.planName} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-blue-600">{plan.planName}</h3>
            <p className="text-3xl font-extrabold my-3">₹{plan.price}</p>
            <p className="text-gray-500 mb-3">{plan.duration}</p>
            <p className="text-sm flex-grow">{plan.description}</p>
            <button onClick={() => handlePlanClick(plan)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Choose Plan</button>
          </div>
        ))}
      </div>
    </>
  );
};


const UserDashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profileRes = await getMyProfile();
        setProfile(profileRes.data);
        setIsMember(true);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsMember(false);
          try {
            const receiptRes = await getMyLatestReceipt();
            setReceipt(receiptRes.data);
            const pendingRequestRes = await getMyPendingRequest();
            if (pendingRequestRes.data) {
              setHasPendingRequest(true);
            }
          } catch (err) {
            const plansRes = await getAllPlans();
            setPlans(plansRes.data);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [hasPendingRequest]);

  const handleApplyClick = () => {
      setIsModalOpen(true);
  };

  const handleFormSubmit = async (memberDetails) => {
      try {
          await createRequest({ 
              planId: receipt.planDetails._id, 
              paymentId: receipt.paymentDetails._id,
              memberDetails 
          });
          setIsModalOpen(false);
          setHasPendingRequest(true);
          alert('Membership request submitted successfully!');
      } catch (error) {
          alert(error.response?.data?.msg || 'Failed to submit request.');
      }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading your dashboard...</div>;
  }

  return (
    <div className="p-4 sm:p-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome, {user?.name || 'User'}!</h1>
      {isMember ? (
          <MemberView profile={profile} />
      ) : receipt ? (
          <PaidUserView receipt={receipt} hasPendingRequest={hasPendingRequest} onApplyClick={handleApplyClick} />
      ) : (
          <NonPaidUserView plans={plans} />
      )}

      {isModalOpen && (
          <MembershipFormModal 
              plan={receipt.planDetails} 
              onClose={() => setIsModalOpen(false)} 
              onSubmit={handleFormSubmit}
          />
      )}
    </div>
  );
};

export default UserDashboardPage;