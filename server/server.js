const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/extract', async (req, res) => {
  const { text } = req.body;
  console.log(text)

  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: `You are a master Japanese menu reader, return a list of json only. Extract menu items from the following text and group them into a list of objects like this [{name:, japanese_name:, price:, quantity:0}]. Quantity is always 0. Make sure each object makes logical sense with each other, and are in english. Only return the list of json, nothing else` },
      { role: 'user', content: `Translate the following order into list of json: ${text}` },
      ],
      max_tokens: 1000,
      temperature: 0
    });
    console.log(response.data.choices[0].message.content)
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/chat', async (req, res) => {
  const { text } = req.body;

  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that translates English text into Japanese.' },
        { role: 'user', content: `Translate the following order into Japanese: ${text}` },
      ],
      max_tokens: 500,
    });
    console.log(response.data.choices[0].message.content)
    res.json({ translatedText: response.data.choices[0].message.content });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
