import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 transition-transform hover:scale-105">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color} text-xl mb-3`}>
        {icon}
      </div>
      <h4 className="text-gray-700 font-semibold">{text}</h4>
      <p className="text-2xl font-bold text-gray-900">{number}</p>
    </div>
  );
};

export default SummaryCard;
