// src/components/Card.jsx
import React from "react";

const Card = ({ title, value, subtitle, icon, color }) => {
  return (
    <div className={`p-6 rounded-2xl shadow-md flex items-center space-x-4 ${color}`}>
      <div>{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <span className="text-sm text-gray-600">{subtitle}</span>
      </div>
    </div>
  );
};

export default Card;
