const amqp = require('amqplib');

let channel;

async function initRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('films_queue', { durable: true });
}

async function publishFilm(film) {
    if (!channel) await initRabbitMQ();
    channel.sendToQueue('films_queue', Buffer.from(JSON.stringify(film)), {
        persistent: true
    });
}

module.exports = { initRabbitMQ, publishFilm };
