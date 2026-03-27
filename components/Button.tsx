
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  type = 'button',
  disabled = false
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    secondary: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
    outline: "border-2 border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white",
    ghost: "text-gray-400 hover:text-white hover:bg-gray-800"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
