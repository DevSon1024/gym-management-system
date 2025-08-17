import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 text-center">
        <p>&copy; {currentYear} GymSys. All Rights Reserved.</p>
        <p className="text-sm text-gray-400">A Minor College Project</p>
      </div>
    </footer>
  );
};

export default Footer;