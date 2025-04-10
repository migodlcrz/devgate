import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center px-4 py-2 bg-gray-950 text-white rounded-lg font-semibold 
        hover:bg-gray-900 transition ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
