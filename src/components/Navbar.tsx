import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Bus className="h-8 w-8" />
            <span className="text-2xl font-bold">RedBus</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center space-x-1 hover:text-gray-200">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className="bg-white text-red-600 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-red-600 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;