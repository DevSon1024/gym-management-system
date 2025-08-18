import React from 'react';

const PlanCard = ({ plan, onDetailsClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex-shrink-0 w-80">
      <img src={`http://localhost:5000${plan.imageUrl}`} alt={plan.planName} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-2xl font-bold text-blue-600">{plan.planName}</h3>
      <p className="text-4xl font-extrabold my-3 text-gray-800">₹{plan.price}</p>
      <p className="text-gray-500 mb-4">{plan.duration}</p>
      <button
        onClick={onDetailsClick}
        className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-black transition"
      >
        View Details
      </button>
    </div>
  );
};

export default PlanCard;