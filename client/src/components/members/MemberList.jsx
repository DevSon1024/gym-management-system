import React from 'react';

const MemberList = ({ members, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-700 p-6">Current Members</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Contact</th>
              <th className="p-4 font-semibold text-gray-600">Membership</th>
              <th className="p-4 font-semibold text-gray-600">End Date</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member._id} className="hover:bg-gray-50">
                <td className="p-4 whitespace-nowrap">{member.name}</td>
                <td className="p-4 whitespace-nowrap">{member.contact}</td>
                <td className="p-4 whitespace-nowrap"><span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">{member.membershipType}</span></td>
                <td className="p-4 whitespace-nowrap">{new Date(member.endDate).toLocaleDateString()}</td>
                <td className="p-4 whitespace-nowrap flex space-x-4">
                  <button onClick={() => onEdit(member)} className="text-green-600 hover:text-green-800 font-semibold">Edit</button>
                  <button onClick={() => onDelete(member._id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;