import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 text-center px-4">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800">
          Welcome to <span className="text-blue-600">GymSys</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          The all-in-one solution to manage your members, trainers, and plans with ease and efficiency.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/login"
            className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="mt-16 text-gray-500">
        <p>A minor project for demonstrating modern web development with the MERN stack.</p>
      </div>
    </div>
  );
};

export default LandingPage;