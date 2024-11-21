import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Seat {
  id: string;
  number: string;
  price: number;
  isBooked: boolean;
}

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const busDetails = location.state?.busDetails;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate dummy seats data
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    for (let i = 1; i <= 40; i++) {
      seats.push({
        id: `seat-${i}`,
        number: `${Math.floor((i-1)/4)}${String.fromCharCode(65 + ((i-1)%4))}`,
        price: busDetails?.price || 899,
        isBooked: Math.random() < 0.3
      });
    }
    return seats;
  };

  const seats = generateSeats();

  const toggleSeatSelection = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalAmount = selectedSeats.length * (busDetails?.price || 899);

  const handleProceedToPayment = () => {
    navigate('/payment', {
      state: {
        selectedSeats,
        totalAmount,
        busDetails
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Bus Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">{busDetails?.name || 'Express Travels'}</h2>
        <div className="flex justify-between text-gray-600">
          <span>{busDetails?.type || 'AC Sleeper'}</span>
          <span>{busDetails?.departure || '06:00 AM'} - {busDetails?.arrival || '02:00 PM'}</span>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Seats</h3>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-6 h-6 border-2 border-gray-300 rounded mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-600 rounded mr-2"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {seats.map((seat) => (
            <button
              key={seat.id}
              disabled={seat.isBooked}
              onClick={() => toggleSeatSelection(seat.id)}
              className={`
                p-4 rounded-lg text-center transition-colors
                ${seat.isBooked 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : selectedSeats.includes(seat.id)
                    ? 'bg-red-600 text-white'
                    : 'border-2 border-gray-300 hover:border-red-600'
                }
              `}
            >
              {seat.number}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Selected Seats: {selectedSeats.length}</p>
              <p className="text-2xl font-bold">Total: ₹{totalAmount}</p>
            </div>
            <button
              onClick={handleProceedToPayment}
              disabled={selectedSeats.length === 0}
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <span>Proceed to Payment</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;