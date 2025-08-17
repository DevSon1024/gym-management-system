import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false }) => {
  const baseStyle = "w-full p-3 rounded-lg font-semibold transition duration-300 disabled:opacity-50";
  
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;