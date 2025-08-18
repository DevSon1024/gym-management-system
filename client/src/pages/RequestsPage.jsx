import React, { useState, useEffect } from 'react';
import { getRequests, approveRequest, rejectRequest } from '../api/gymApi';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await getRequests();
      setRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    await approveRequest(id);
    fetchRequests();
  };

  const handleReject = async (id) => {
    await rejectRequest(id);
    fetchRequests();
  };

  if (loading) return <p>Loading requests...</p>;

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Membership Requests</h1>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          {requests.length > 0 ? (
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">User Name</th>
                  <th className="p-4 font-semibold text-gray-600">Plan</th>
                  <th className="p-4 font-semibold text-gray-600">Price</th>
                  <th className="p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td className="p-4">{req.user.name}</td>
                    <td className="p-4">{req.plan.planName}</td>
                    <td className="p-4">₹{req.plan.price}</td>
                    <td className="p-4 space-x-2">
                      <button onClick={() => handleApprove(req._id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                      <button onClick={() => handleReject(req._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-6 text-center text-gray-500">No pending requests.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;