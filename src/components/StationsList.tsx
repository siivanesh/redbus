import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

// Sample stations data (in a real app, this would come from an API)
const STATIONS = [
  { id: 1, name: 'Mumbai', state: 'Maharashtra', popular: true },
  { id: 2, name: 'Delhi', state: 'Delhi', popular: true },
  { id: 3, name: 'Bangalore', state: 'Karnataka', popular: true },
  { id: 4, name: 'Chennai', state: 'Tamil Nadu', popular: true },
  { id: 5, name: 'Kolkata', state: 'West Bengal', popular: true },
  { id: 6, name: 'Hyderabad', state: 'Telangana', popular: true },
  { id: 7, name: 'Pune', state: 'Maharashtra', popular: true },
  { id: 8, name: 'Ahmedabad', state: 'Gujarat', popular: true },
  { id: 9, name: 'Jaipur', state: 'Rajasthan', popular: false },
  { id: 10, name: 'Surat', state: 'Gujarat', popular: false },
  { id: 11, name: 'Lucknow', state: 'Uttar Pradesh', popular: false },
  { id: 12, name: 'Kanpur', state: 'Uttar Pradesh', popular: false },
  { id: 13, name: 'Nagpur', state: 'Maharashtra', popular: false },
  { id: 14, name: 'Indore', state: 'Madhya Pradesh', popular: false },
  { id: 15, name: 'Thane', state: 'Maharashtra', popular: false },
].sort((a, b) => a.name.localeCompare(b.name));

interface StationsListProps {
  onSelect: (station: string) => void;
  type: 'from' | 'to';
}

const StationsList: React.FC<StationsListProps> = ({ onSelect, type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredStations = STATIONS.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularStations = STATIONS.filter(station => station.popular);

  const handleStationClick = (stationName: string) => {
    onSelect(stationName);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full">
      <div
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <MapPin className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder={`Select ${type === 'from' ? 'departure' : 'arrival'} station`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto">
          {searchTerm === '' && (
            <div className="p-4 border-b">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Popular Stations</h3>
              <div className="grid grid-cols-2 gap-2">
                {popularStations.map(station => (
                  <button
                    key={station.id}
                    onClick={() => handleStationClick(station.name)}
                    className="text-left px-3 py-2 hover:bg-red-50 rounded-md text-sm"
                  >
                    <div className="font-medium">{station.name}</div>
                    <div className="text-xs text-gray-500">{station.state}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-2">
            {searchTerm !== '' && (
              <div className="px-2 py-1 text-sm text-gray-500">
                {filteredStations.length} stations found
              </div>
            )}
            {filteredStations.map(station => (
              <button
                key={station.id}
                onClick={() => handleStationClick(station.name)}
                className="w-full text-left px-4 py-2 hover:bg-red-50 rounded-md"
              >
                <div className="font-medium">{station.name}</div>
                <div className="text-sm text-gray-500">{station.state}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StationsList;