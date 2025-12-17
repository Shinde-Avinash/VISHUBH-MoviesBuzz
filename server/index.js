const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fs = require('fs');

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['https://aesthetic-dieffenbachia-0b6a28.netlify.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
