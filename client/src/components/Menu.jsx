import React from 'react';

const MenuItem = ({ item, onQuantityChange }) => {
  const { name, description, price, quantity } = item;

  const handleChange = (delta) => {
    console.log(item,delta)
    onQuantityChange(item, delta);
  };

  return (
    <div className="bg-[#00392E] p-4 rounded shadow-lg mb-4">
      <h3 className="text-white font-bold text-lg">{name}</h3>
      <p className="text-white text-sm mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold">{price}</span>
        <div className="flex">
          <button className="bg-green-600 text-white px-2 py-1 rounded-l" onClick={() => handleChange(-1)}>-</button>
          <span className="px-2 py-1 bg-[#002D1D] text-white">{quantity}</span>
          <button className="bg-green-600 text-white px-2 py-1 rounded-r" onClick={() => handleChange(1)}>+</button>
        </div>
      </div>
    </div>
  );
};

const Menu = ({ menuItems, onQuantityChange }) => {
  return (
    <div className="mt-4">
      <h2 className="text-white text-xl font-bold mb-4">Menu</h2>
      {menuItems.map((item) => (
        <MenuItem key={item.name} item={item} onQuantityChange={onQuantityChange} />
      ))}
    </div>
  );
};

export default Menu;
