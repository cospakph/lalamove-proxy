const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/proxy', async (req, res) => {
  const { method, url, headers, data } = req.body;

  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Proxy error', error: error.message });
    }
  }
});

// Just a GET endpoint so you can test if Render is alive
app.get('/', (req, res) => {
  res.send('Proxy Server is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
