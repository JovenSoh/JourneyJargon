import React, { useState } from 'react';
import UploadImage from './components/UploadImage';
import OCR from './components/OCR';
import Menu from './components/Menu';
import Order from './components/Order';
import { extractMenuItems, translateOrder } from './services/getApi';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [orderText, setOrderText] = useState('');

  const handleOCRComplete = async (text) => {
    setOcrText(text);
    const menu = await extractMenuItems(text);
    setMenuItems(menu);
  };

  const handleQuantityChange = (item, delta) => {
    setMenuItems((prevMenuItems) => {
      return prevMenuItems.map((i) => {
        if (i.name === item.name) {
          return { ...i, quantity: Math.max(0, i.quantity + delta) };
        }
        return i;
      });
    });
  };

  const handleOrder = async () => {
    const order = menuItems
      .filter((item) => item.quantity > 0)
      .map((item) => `${item.quantity} x ${item.name}`)
      .join(', ');
  
    const translatedOrder = await translateOrder(order);
    setOrderText(translatedOrder);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#002D1D]">
      <div className="container mx-auto px-4">
        <h1 className="text-white text-4xl font-bold mb-8">JourneyJargon</h1>
        <UploadImage onImageUpload={setImageFile} />
        {imageFile && <OCR imageFile={imageFile} onOCRComplete={handleOCRComplete} />}
        {menuItems.length > 0 && (
          <>
            <Menu menuItems={menuItems} onQuantityChange={handleQuantityChange} />
            <button className="bg-green-600 text-white px-4 py-2 rounded mt-4" onClick={handleOrder}>Order!</button>
          </>
        )}
        {orderText && <Order orderText={orderText} />}
      </div>
    </div>
  );
}

export default App;
