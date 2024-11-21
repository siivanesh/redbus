import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Wifi, Coffee, Battery } from 'lucide-react';

const DUMMY_BUSES = [
  {
    id: 1,
    name: 'Express Travels',
    departure: '06:00 AM',
    arrival: '02:00 PM',
    price: 899,
    type: 'AC Sleeper',
    seats: 23,
    rating: 4.5,
    amenities: ['wifi', 'charging', 'refreshments']
  },
  {
    id: 2,
    name: 'Royal Coaches',
    departure: '08:30 AM',
    arrival: '04:30 PM',
    price: 999,
    type: 'AC Seater',
    seats: 15,
    rating: 4.2,
    amenities: ['wifi', 'charging']
  },
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};

  const handleSelectSeats = (busDetails: typeof DUMMY_BUSES[0]) => {
    navigate('/select-seats', { state: { busDetails } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{from} → {to}</h2>
            <p className="text-gray-600">{date}</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Modify Search
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {DUMMY_BUSES.map((bus) => (
          <div key={bus.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{bus.name}</h3>
                <p className="text-gray-600">{bus.type}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span>{bus.rating}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-semibold">{bus.departure}</p>
                    <p className="text-sm text-gray-500">Departure</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-semibold">{bus.arrival}</p>
                    <p className="text-sm text-gray-500">Arrival</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">Amenities</p>
                <div className="flex space-x-3">
                  {bus.amenities.includes('wifi') && (
                    <Wifi className="h-5 w-5 text-gray-600" />
                  )}
                  {bus.amenities.includes('charging') && (
                    <Battery className="h-5 w-5 text-gray-600" />
                  )}
                  {bus.amenities.includes('refreshments') && (
                    <Coffee className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <p className="text-sm text-green-600">{bus.seats} seats available</p>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-2xl font-bold">₹{bus.price}</p>
                  <p className="text-sm text-gray-500">per seat</p>
                </div>
                <button 
                  onClick={() => handleSelectSeats(bus)}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Select Seats
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;