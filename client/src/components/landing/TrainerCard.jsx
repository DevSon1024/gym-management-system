import React from 'react';

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex-shrink-0 w-80">
      <img src={`http://localhost:5000${trainer.imageUrl}`} alt={trainer.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500" />
      <h3 className="text-xl font-bold text-gray-800">{trainer.name}</h3>
      <p className="text-blue-500 font-semibold mb-4">{trainer.expertise}</p>
      {/* The button has been removed from this component */}
    </div>
  );
};

export default TrainerCard;