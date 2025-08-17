import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import UsersPage from './pages/UsersPage';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/DashboardPage'; // Renaming for clarity
import UserDashboardPage from './pages/UserDashboardPage';
import MembersPage from './pages/MembersPage';
import TrainersPage from './pages/TrainersPage';
import PlansPage from './pages/PlansPage';

// Route Protection Components
const UserRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  return isAuthenticated && !isAdmin ? <UserDashboardPage /> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  return isAuthenticated && isAdmin ? children : <Navigate to="/login" />;
};


const AppContent = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={!isAuthenticated ? <LandingPage /> : (isAdmin ? <Navigate to="/dashboard"/> : <Navigate to="/user-dashboard"/>)} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* User Route */}
            <Route path="/user-dashboard" element={<UserRoute />} />

            {/* Admin Routes */}
            <Route path="/dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            <Route path="/members" element={<AdminRoute><MembersPage /></AdminRoute>} />
            <Route path="/users" element={<AdminRoute><UsersPage /></AdminRoute>} /> 
            <Route path="/trainers" element={<AdminRoute><TrainersPage /></AdminRoute>} />
            <Route path="/plans" element={<AdminRoute><PlansPage /></AdminRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;