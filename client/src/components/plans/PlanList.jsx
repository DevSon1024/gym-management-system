import React from 'react';

const PlanList = ({ plans, onEdit, onDelete, view }) => {
  if (view === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <img src={`http://localhost:5000${plan.imageUrl}`} alt={plan.planName} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-bold text-blue-600">{plan.planName}</h3>
            <p className="text-4xl font-extrabold my-3 text-gray-800">₹{plan.price}</p>
            <p className="text-gray-500 mb-4">{plan.duration}</p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => onEdit(plan)} className="text-green-600 hover:text-green-800 font-semibold">Edit</button>
              <button onClick={() => onDelete(plan._id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Image</th>
              <th className="p-4 font-semibold text-gray-600">Plan Name</th>
              <th className="p-4 font-semibold text-gray-600">Duration</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {plans.map((plan) => (
              <tr key={plan._id} className="hover:bg-gray-50">
                <td className="p-4">
                  <img src={`http://localhost:5000${plan.imageUrl}`} alt={plan.planName} className="w-24 h-16 object-cover rounded-lg" />
                </td>
                <td className="p-4 whitespace-nowrap font-medium text-gray-900">{plan.planName}</td>
                <td className="p-4 whitespace-nowrap">{plan.duration}</td>
                <td className="p-4 whitespace-nowrap">₹{plan.price}</td>
                <td className="p-4 whitespace-nowrap flex space-x-4">
                  <button onClick={() => onEdit(plan)} className="text-green-600 hover:text-green-800 font-semibold">Edit</button>
                  <button onClick={() => onDelete(plan._id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanList;