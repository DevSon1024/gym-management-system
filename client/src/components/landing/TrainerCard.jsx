import React from 'react';

const TrainerCard = ({ trainer, onDetailsClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex-shrink-0 w-80">
      <img src={trainer.imageUrl} alt={trainer.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500" />
      <h3 className="text-xl font-bold text-gray-800">{trainer.name}</h3>
      <p className="text-blue-500 font-semibold mb-4">{trainer.expertise}</p>
      <button 
        onClick={onDetailsClick}
        className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-black transition"
      >
        Learn More
      </button>
    </div>
  );
};

export default TrainerCard;