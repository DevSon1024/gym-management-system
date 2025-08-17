import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth(); // Get state directly from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">GymSys</Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // --- Logged In View ---
              <>
                {isAdmin ? (
                  // --- Admin Links ---
                  <>
                    <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                    <Link to="/members" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Members</Link>
                    <Link to="/users" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Users</Link>
                    <Link to="/trainers" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Trainers</Link>
                    <Link to="/plans" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Plans</Link>
                  </>
                ) : (
                  // --- Regular User Links ---
                  <Link to="/user-dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Dashboard</Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              // --- Guest View ---
              <>
                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;