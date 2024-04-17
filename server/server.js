const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const path = require('path');
app.use(cors());

app.get('/api/home', (req, res) => {
  res.json({message: 'Hello World!', people: ['Akossiwa', 'Fred', 'Pops']});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/monitor', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/monitor.js'));
});