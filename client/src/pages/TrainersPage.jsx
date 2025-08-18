import React, { useState, useEffect } from 'react';
import { getTrainers, createTrainer, deleteTrainer, updateTrainer } from '../api/gymApi';
import TrainerForm from '../components/trainers/TrainerForm';
import TrainerList from '../components/trainers/TrainerList';
import EditTrainerModal from '../components/trainers/EditTrainerModal';

const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  useEffect(() => { fetchTrainers(); }, []);
  const fetchTrainers = async () => { const res = await getTrainers(); setTrainers(res.data); };
  const handleAddTrainer = async (data) => { await createTrainer(data); fetchTrainers(); };
  const handleDeleteTrainer = async (id) => { if (window.confirm('Are you sure you want to delete this trainer?')) { await deleteTrainer(id); fetchTrainers(); } };

  const handleEditClick = (trainer) => { setSelectedTrainer(trainer); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedTrainer(null); };
  const handleSaveTrainer = async (updatedData) => {
    await updateTrainer(selectedTrainer._id, updatedData);
    handleCloseModal();
    fetchTrainers();
  };

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Trainers</h1>
      <TrainerForm onTrainerAdded={handleAddTrainer} />
      <div className="flex justify-end mb-4">
        <button onClick={() => setView('grid')} className={`px-4 py-2 rounded-l-lg ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Grid</button>
        <button onClick={() => setView('list')} className={`px-4 py-2 rounded-r-lg ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>List</button>
      </div>
      <TrainerList trainers={trainers} onEdit={handleEditClick} onDelete={handleDeleteTrainer} view={view} />
      {isModalOpen && (
        <EditTrainerModal trainer={selectedTrainer} onClose={handleCloseModal} onSave={handleSaveTrainer} />
      )}
    </div>
  );
};

export default TrainersPage;