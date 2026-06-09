const express = require('express');
const cors = require('cors');
const projectionRoutes = require('./routes/projectionRoutes');
const { startConsumer } = require('./rabbitmq/consumer');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion RabbitMQ
startConsumer().then(() => {
    console.log('RabbitMQ Consumer connecté');
}).catch(console.error);

// Routes
app.use('/api/projections', projectionRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Microservice Projections en écoute sur le port ${PORT}`);
});
