import React, { useState, useEffect } from 'react';
import { getUsers, createMember } from '../api/gymApi';
import AddMembershipModal from '../components/users/AddMembershipModal';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveMembership = async (userId, membershipData) => {
    try {
      await createMember({ userId, ...membershipData });
      handleCloseModal();
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Failed to add membership:", error);
      alert('Failed to add membership. This user might already be a member.');
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Registered Users</h1>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    {user.isMember ? (
                      <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">Active Member</span>
                    ) : (
                      <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">Not a Member</span>
                    )}
                  </td>
                  <td className="p-4">
                    {!user.isMember && (
                      <button onClick={() => handleOpenModal(user)} className="text-blue-600 hover:text-blue-800 font-semibold">
                        Add Membership
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <AddMembershipModal user={selectedUser} onClose={handleCloseModal} onSave={handleSaveMembership} />
      )}
    </div>
  );
};

export default UsersPage;