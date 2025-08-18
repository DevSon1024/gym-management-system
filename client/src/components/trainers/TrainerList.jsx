import React from 'react';

const TrainerList = ({ trainers, onEdit, onDelete, view }) => {
  if (view === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer._id} className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <img src={`http://localhost:5000${trainer.imageUrl}`} alt={trainer.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500" />
            <h3 className="text-xl font-bold text-gray-800">{trainer.name}</h3>
            <p className="text-blue-500 font-semibold mb-2">{trainer.expertise}</p>
            <p className="text-gray-600 mb-4">{trainer.contact}</p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => onEdit(trainer)} className="text-green-600 hover:text-green-800 font-semibold">Edit</button>
              <button onClick={() => onDelete(trainer._id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
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
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Expertise</th>
              <th className="p-4 font-semibold text-gray-600">Contact</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trainers.map((trainer) => (
              <tr key={trainer._id} className="hover:bg-gray-50">
                <td className="p-4">
                  <img src={`http://localhost:5000${trainer.imageUrl}`} alt={trainer.name} className="w-16 h-16 rounded-full object-cover" />
                </td>
                <td className="p-4 whitespace-nowrap">{trainer.name}</td>
                <td className="p-4 whitespace-nowrap">{trainer.expertise}</td>
                <td className="p-4 whitespace-nowrap">{trainer.contact}</td>
                <td className="p-4 whitespace-nowrap flex space-x-4">
                  <button onClick={() => onEdit(trainer)} className="text-green-600 hover:text-green-800 font-semibold">Edit</button>
                  <button onClick={() => onDelete(trainer._id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerList;