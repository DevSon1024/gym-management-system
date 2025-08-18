import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the 
// useAuth hook
import VigorLogo from '/vigor-logo.svg';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={VigorLogo} alt="Vigor Logo" className="h-9" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // --- Logged In View ---
              <>
                {isAdmin ? (
                  // --- Admin Links ---
                  <>
                    <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</Link>
                    <Link to="/members" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Members</Link>
                    <Link to="/users" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Users</Link>
                    <Link to="/trainers" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Trainers</Link>
                    <Link to="/plans" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Plans</Link>
                    <Link to="/requests" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Requests</Link>
                  </>
                ) : (
                  // --- Regular User Links ---
                  <Link to="/user-dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">My Dashboard</Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              // --- Guest View ---
              <>
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors">
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