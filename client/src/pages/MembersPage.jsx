import React, { useState, useEffect } from 'react';
import { getMembers, deleteMember, updateMember, getPlans } from '../api/gymApi'; 
import MemberList from '../components/members/MemberList';
import EditMemberModal from '../components/members/EditMemberModal';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]); // State to hold the list of plans
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersRes = await getMembers();
        setMembers(membersRes.data);
        const plansRes = await getPlans(); // Fetch all plans
        setPlans(plansRes.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchMembers = async () => {
      const response = await getMembers();
      setMembers(response.data);
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Active Memberships</h1>
      
      <MemberList members={members} onEdit={handleEditClick} onDelete={handleDeleteMember} />

      {isModalOpen && (
        <EditMemberModal
          member={selectedMember}
          plans={plans} // Pass the list of plans to the modal
          onClose={handleCloseModal}
          onSave={handleSaveMember}
        />
      )}
    </div>
  );
};

export default MembersPage;