import React, { useState, useEffect } from 'react';
import { getDashboardStats, getAllPlans, getAllTrainers } from '../api/gymApi';
import StatCard from '../components/dashboard/StatCard';
import PlanCard from '../components/landing/PlanCard';
import TrainerCard from '../components/landing/TrainerCard';

const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0112 13a5.995 5.995 0 01-3 5.197" /></svg>;
const TrainersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const PlansIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await getDashboardStats();
        setStats(statsRes.data);

        const plansRes = await getAllPlans();
        setPlans(plansRes.data);

        const trainersRes = await getAllTrainers();
        setTrainers(trainersRes.data);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Members" value={stats?.totalMembers ?? 0} icon={<UsersIcon />} />
        <StatCard title="Trainers Assigned" value={stats?.totalTrainers ?? 0} icon={<TrainersIcon />} />
        <StatCard title="Active Plans" value={stats?.activePlans ?? 0} icon={<PlansIcon />} />
      </div>

      {/* Plans Section */}
      <div className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Membership Plans</h2>
        <div className="flex overflow-x-auto space-x-8 pb-4">
          {plans.map(plan => (
            <PlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      </div>

      {/* Trainers Section */}
      <div className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Expert Trainers</h2>
        <div className="flex overflow-x-auto space-x-8 pb-4">
          {trainers.map(trainer => (
            <TrainerCard key={trainer._id} trainer={trainer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;