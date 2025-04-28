const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Proxy route
app.post('/proxy', async (req, res) => {
  try {
    const { headers, body } = req.body;

    const response = await axios.post('https://rest.ph.lalamove.com/v3/orders', body, {
      headers: headers,
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).send(error.response?.data || { error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
