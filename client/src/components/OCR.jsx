import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

const OCR = ({ imageFile, onOCRComplete }) => {
  const [ocrText, setOcrText] = useState('');
  const [apiCallInProgress, setApiCallInProgress] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      if (!imageFile || apiCallInProgress) {
        return;
      }

      setApiCallInProgress(true);

      try {
        const { data: { text } } = await Tesseract.recognize(imageFile, 'eng+jpn', { logger: (m) => console.log(m) });
        setOcrText(text);
        console.log("ONCE", text);
        onOCRComplete(text);
      } catch (error) {
        console.error("OCR error:", error);
      } finally {
        setApiCallInProgress(false);
      }
    };

    processImage();
  }, [imageFile]);

  return (
    <div className="mt-4 text-white">
      <h2 className="text-xl font-bold mb-2">OCR Output:</h2>
      <pre className="text-sm whitespace-pre-wrap">{ocrText}</pre>
    </div>
  );
};

export default OCR;
