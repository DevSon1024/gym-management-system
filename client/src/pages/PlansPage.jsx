import React, { useState, useEffect } from 'react';
import { getPlans, createPlan, deletePlan, updatePlan } from '../api/gymApi';
import PlanForm from '../components/plans/PlanForm';
import PlanList from '../components/plans/PlanList';
import EditPlanModal from '../components/plans/EditPlanModal';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  useEffect(() => { fetchPlans(); }, []);
  const fetchPlans = async () => { const res = await getPlans(); setPlans(res.data); };
  const handleAddPlan = async (data) => { await createPlan(data); fetchPlans(); };
  const handleDeletePlan = async (id) => { if (window.confirm('Are you sure you want to delete this plan?')) { await deletePlan(id); fetchPlans(); } };

  const handleEditClick = (plan) => { setSelectedPlan(plan); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedPlan(null); };
  const handleSavePlan = async (updatedData) => {
    await updatePlan(selectedPlan._id, updatedData);
    handleCloseModal();
    fetchPlans();
  };

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Membership Plans</h1>
      <PlanForm onPlanAdded={handleAddPlan} />
      <div className="flex justify-end mb-4">
        <button onClick={() => setView('grid')} className={`px-4 py-2 rounded-l-lg ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Grid</button>
        <button onClick={() => setView('list')} className={`px-4 py-2 rounded-r-lg ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>List</button>
      </div>
      <PlanList plans={plans} onEdit={handleEditClick} onDelete={handleDeletePlan} view={view} />
      {isModalOpen && (
        <EditPlanModal plan={selectedPlan} onClose={handleCloseModal} onSave={handleSavePlan} />
      )}
    </div>
  );
};

export default PlansPage;