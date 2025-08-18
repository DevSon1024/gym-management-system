import React, { useState, useEffect } from 'react';
// The createMember function is no longer needed here, but updateMember and deleteMember are.
import { getMembers, deleteMember, updateMember } from '../api/gymApi'; 
import MemberList from '../components/members/MemberList';
import EditMemberModal from '../components/members/EditMemberModal';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDeleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      await deleteMember(id);
      fetchMembers();
    }
  };

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleSaveMember = async (updatedMember) => {
    // Note: The user details (name, email) are not directly editable here
    // as they belong to the User model. This modal only updates membership info.
    await updateMember(updatedMember._id, updatedMember);
    handleCloseModal();
    fetchMembers();
  };

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Active Memberships</h1>
      
      {/* The MemberForm component has been removed from this page */}
      
      <MemberList members={members} onEdit={handleEditClick} onDelete={handleDeleteMember} />

      {isModalOpen && (
        <EditMemberModal
          member={selectedMember}
          onClose={handleCloseModal}
          onSave={handleSaveMember}
        />
      )}
    </div>
  );
};

export default MembersPage;