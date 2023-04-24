import React from 'react';

const Order = ({ orderText }) => {
  return (
    <div className="mt-4">
      <h2 className="text-white text-xl font-bold mb-2">Order in Japanese:</h2>
      <div className="bg-[#00392E] p-4 rounded shadow-lg">
        <p className="text-white">{orderText}</p>
      </div>
    </div>
  );
};

export default Order;
