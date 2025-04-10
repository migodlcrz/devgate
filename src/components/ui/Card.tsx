import React from "react";

interface CardProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={`flex flex-col p-5 border-[0.1px] border-gray-300 rounded-lg ${className}`}
    >
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold text-black">{title}</span>
        <span className="text-sm text-gray-500">{description}</span>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default Card;
