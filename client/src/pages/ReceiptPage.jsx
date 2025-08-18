import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ReceiptPage = () => {
  const { state } = useLocation();
  const { receipt } = state || {};

  if (!receipt) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">Could not find receipt details.</h2>
        <Link to="/user-dashboard" className="text-blue-600">Go to Dashboard</Link>
      </div>
    );
  }

  const { memberDetails, planDetails, paymentDetails } = receipt;

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-4">Payment Successful!</h1>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Payment Receipt</h2>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-lg font-bold mb-2">Transaction Details</h3>
          <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
          <p><strong>Date:</strong> {new Date(paymentDetails.paymentDate).toLocaleString()}</p>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-lg font-bold mb-2">User Details</h3>
          <p><strong>Name:</strong> {memberDetails.name}</p>
          <p><strong>Email:</strong> {memberDetails.email}</p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="text-lg font-bold mb-2">Plan Details</h3>
          <p><strong>Plan Name:</strong> {planDetails.planName}</p>
          <p><strong>Duration:</strong> {planDetails.duration}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Billing Summary</h3>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-1">Amount:</td>
                <td className="text-right">₹{paymentDetails.amount.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-1">GST (18%):</td>
                <td className="text-right">₹{paymentDetails.gst.toFixed(2)}</td>
              </tr>
              <tr className="font-bold text-xl border-t-2">
                <td className="py-2">Total Paid:</td>
                <td className="text-right">₹{paymentDetails.totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center mt-8">
        <Link to="/user-dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Go to My Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ReceiptPage;