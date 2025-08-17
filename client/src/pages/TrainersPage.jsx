import React, { useState, useEffect } from 'react';
import { getTrainers, createTrainer, deleteTrainer, updateTrainer } from '../api/gymApi';
import TrainerForm from '../components/trainers/TrainerForm';
import TrainerList from '../components/trainers/TrainerList';
import EditTrainerModal from '../components/trainers/EditTrainerModal';

const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => { fetchTrainers(); }, []);
  const fetchTrainers = async () => { const res = await getTrainers(); setTrainers(res.data); };
  const handleAddTrainer = async (data) => { await createTrainer(data); fetchTrainers(); };
  const handleDeleteTrainer = async (id) => { if (window.confirm('...')) { await deleteTrainer(id); fetchTrainers(); } };
  
  const handleEditClick = (trainer) => { setSelectedTrainer(trainer); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedTrainer(null); };
  const handleSaveTrainer = async (updated) => { await updateTrainer(updated._id, updated); handleCloseModal(); fetchTrainers(); };

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Trainers</h1>
      <TrainerForm onTrainerAdded={handleAddTrainer} />
      <TrainerList trainers={trainers} onEdit={handleEditClick} onDelete={handleDeleteTrainer} />
      {isModalOpen && (
        <EditTrainerModal trainer={selectedTrainer} onClose={handleCloseModal} onSave={handleSaveTrainer} />
      )}
    </div>
  );
};

export default TrainersPage;