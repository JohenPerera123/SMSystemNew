import React from 'react'

const SummaryCard = ({ icon, text, number,color }) => {
    return (
      <div className="bg-white shadow-md rounded-md p-4">
        <div className={`text-3xl flex justify-center items-center ${color} text-white `}>
          {icon}
        </div>
        <div className='pl-4 py-1'>
          <p className="text-lg font-semibold">{text}</p>
          <p className="text-xl font-bold">{number}</p>
        </div>
      </div>
    );
  };
  

export default SummaryCard