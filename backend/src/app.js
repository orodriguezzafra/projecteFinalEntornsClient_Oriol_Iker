const express = require('express');
const cors = require('cors');
const playerRoutes = require('./routes/player.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/players', playerRoutes);

app.use(errorHandler);

module.exports = app;
