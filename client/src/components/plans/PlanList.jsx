import React from 'react';

const PlanList = ({ plans, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-700 p-6">Available Plans</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Plan Name</th>
              <th className="p-4 font-semibold text-gray-600">Duration</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {plans.map((plan) => (
              <tr key={plan._id} className="hover:bg-gray-50">
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