import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const extractMenuItems = async (ocrText) => {
  const response = await axios.post(`${API_URL}/extract`, { text: ocrText });
  return JSON.parse(response.data);
};

export const translateOrder = async (orderText) => {
  const response = await axios.post(`${API_URL}/chat`, { text: orderText });
  return response.data.translatedText;
};
