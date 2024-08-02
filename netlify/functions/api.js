const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

app.get('/.netlify/functions/api/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.post('/.netlify/functions/api/bfhl', (req, res) => {
  const { data } = req.body;
  
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid input' });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item) && item.length === 1);
  const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}) > 0 ? a : b)] : [];

    res.json({
      is_success: true,
      user_id: "abhinav_1234",
      email: "abhinavmittal2003@gmail.com",
      roll_number: "RA2111026030136",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet
    });
  });

  module.exports.handler = serverless(app);
