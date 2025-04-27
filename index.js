const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const { url, method, headers, data } = req.body;

    const response = await axios({
      url,
      method,
      headers,
      data
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      data: error.response?.data || null
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
