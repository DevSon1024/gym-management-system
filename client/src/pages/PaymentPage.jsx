import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPayment } from '../api/gymApi';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { plan } = state || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  if (!plan) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold">Invalid session. Please select a plan first.</h2>
      </div>
    );
  }
  
  const amount = plan.price;
  const gst = (amount * 0.18).toFixed(2);
  const totalAmount = (parseFloat(amount) + parseFloat(gst)).toFixed(2);

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };
  
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { data } = await createPayment({ planId: plan._id, amount, gst, totalAmount });
      
      // Redirect to the receipt page with the new receipt data
      navigate('/receipt', { state: { receipt: data.receipt }, replace: true });

    } catch (error) {
      alert('Payment failed. Please try again.');
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Payment Summary</h2>
        <div className="p-4 border rounded-lg space-y-2">
          <div className="flex justify-between"><span className="font-semibold">Plan:</span><span>{plan.planName}</span></div>
          <div className="flex justify-between"><span className="font-semibold">Duration:</span><span>{plan.duration}</span></div>
          <hr />
          <div className="flex justify-between"><span>Amount:</span><span>₹{amount}</span></div>
          <div className="flex justify-between"><span>GST (18%):</span><span>₹{gst}</span></div>
          <hr />
          <div className="flex justify-between text-xl font-bold"><span >Total:</span><span>₹{totalAmount}</span></div>
        </div>

        <div className="space-y-4">
            <Input name="cardNumber" value={cardDetails.cardNumber} onChange={handleInputChange} placeholder="Card Number" required />
            <div className="grid grid-cols-2 gap-4">
                <Input name="expiryDate" value={cardDetails.expiryDate} onChange={handleInputChange} placeholder="MM/YY" required />
                <Input name="cvv" value={cardDetails.cvv} onChange={handleInputChange} placeholder="CVV" required />
            </div>
        </div>

        <Button onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;