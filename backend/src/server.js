const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 4000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/futbol-transfermarkt';

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conectat a MongoDB');
        app.listen(PORT, () => {
            console.log(`Servidor escoltant a http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connectant a MongoDB:', err);
    });
