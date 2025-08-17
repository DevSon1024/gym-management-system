import React, { useState, useEffect } from 'react';
import { getPlans, createPlan, deletePlan, updatePlan } from '../api/gymApi';
import PlanForm from '../components/plans/PlanForm';
import PlanList from '../components/plans/PlanList';
import EditPlanModal from '../components/plans/EditPlanModal';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => { fetchPlans(); }, []);
  const fetchPlans = async () => { const res = await getPlans(); setPlans(res.data); };
  const handleAddPlan = async (data) => { await createPlan(data); fetchPlans(); };
  const handleDeletePlan = async (id) => { if (window.confirm('...')) { await deletePlan(id); fetchPlans(); } };

  const handleEditClick = (plan) => { setSelectedPlan(plan); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedPlan(null); };
  const handleSavePlan = async (updated) => { await updatePlan(updated._id, updated); handleCloseModal(); fetchPlans(); };

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Membership Plans</h1>
      <PlanForm onPlanAdded={handleAddPlan} />
      <PlanList plans={plans} onEdit={handleEditClick} onDelete={handleDeletePlan} />
      {isModalOpen && (
        <EditPlanModal plan={selectedPlan} onClose={handleCloseModal} onSave={handleSavePlan} />
      )}
    </div>
  );
};

export default PlansPage;