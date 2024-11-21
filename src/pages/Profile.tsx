import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Ticket, MapPin, Clock, User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  const dummyBookings = [
    {
      id: 1,
      from: 'Mumbai',
      to: 'Pune',
      date: '2024-03-15',
      busName: 'Express Travels',
      seatNo: 'A4',
      status: 'Upcoming'
    },
    {
      id: 2,
      from: 'Pune',
      to: 'Mumbai',
      date: '2024-02-28',
      busName: 'Royal Coaches',
      seatNo: 'B6',
      status: 'Completed'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <User className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name || 'User Name'}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
                Edit Profile
              </button>
              <button className="w-full border border-red-600 text-red-600 py-2 rounded-md hover:bg-red-50">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
          <div className="space-y-4">
            {dummyBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Ticket className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">{booking.busName}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="font-medium">{booking.from}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">To</p>
                        <p className="font-medium">{booking.to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{booking.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Ticket className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Seat</p>
                        <p className="font-medium">{booking.seatNo}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-4">
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
                    View Ticket
                  </button>
                  {booking.status === 'Upcoming' && (
                    <button className="flex-1 border border-red-600 text-red-600 py-2 rounded-md hover:bg-red-50">
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;