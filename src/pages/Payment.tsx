import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats, totalAmount, busDetails } = location.state || {};

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment
    // For demo purposes, we'll just redirect to success
    navigate('/profile');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength={3}
                    className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                name="name"
                value={paymentDetails.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors"
            >
              Pay ₹{totalAmount}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">{busDetails?.name || 'Express Travels'}</h3>
              <p className="text-gray-600">{busDetails?.type || 'AC Sleeper'}</p>
              <p className="text-gray-600">
                {busDetails?.departure || '06:00 AM'} - {busDetails?.arrival || '02:00 PM'}
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">Selected Seats</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSeats?.map((seatId: string) => (
                  <span
                    key={seatId}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {seatId.split('-')[1]}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Ticket Price</span>
                <span>₹{busDetails?.price || 899} × {selectedSeats?.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>₹20</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total Amount</span>
                <span>₹{totalAmount + 20}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;