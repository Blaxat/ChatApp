require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const rfidRoutes = require('./routes/rfid');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/rfid', rfidRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
