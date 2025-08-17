import React, { useState, useEffect } from 'react';
import { getMembers, createMember, deleteMember, updateMember } from '../api/gymApi';
import MemberForm from '../components/members/MemberForm';
import MemberList from '../components/members/MemberList';
import EditMemberModal from '../components/members/EditMemberModal';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const response = await getMembers();
    setMembers(response.data);
  };

  const handleAddMember = async (memberData) => {
    try {
      await createMember(memberData);
      fetchMembers();
    } catch (error) {
      console.error('Error creating member:', error);
    }
  };

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
    await updateMember(updatedMember._id, updatedMember);
    handleCloseModal();
    fetchMembers();
  };

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Members</h1>
      <MemberForm onMemberAdded={handleAddMember} />
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