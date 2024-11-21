import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search } from 'lucide-react';
import StationsList from '../components/StationsList';

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search', { state: { from, to, date } });
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)]">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Book Bus Tickets Online
          </h1>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StationsList type="from" onSelect={setFrom} />
                <StationsList type="to" onSelect={setTo} />
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Search Buses</span>
              </button>
            </form>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Safety+</h3>
                <p>Enhanced safety measures and regular sanitization</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Flexible Bookings</h3>
                <p>Easy cancellation and rescheduling options</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p>Round the clock customer service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;