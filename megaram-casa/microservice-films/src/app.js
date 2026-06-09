const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const filmRoutes = require('./routes/filmRoutes');
const { initRabbitMQ } = require('./rabbitmq/producer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion RabbitMQ
initRabbitMQ().then(() => {
    console.log('RabbitMQ Producer connecté');
}).catch(console.error);

// Routes
app.use('/api/films', filmRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Microservice Films en écoute sur le port ${PORT}`);
});
