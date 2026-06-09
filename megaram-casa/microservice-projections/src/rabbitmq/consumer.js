const amqp = require('amqplib');
let films = [];

async function startConsumer() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    await channel.assertQueue('films_queue', { durable: true });
    
    channel.consume('films_queue', (msg) => {
        if (msg !== null) {
            const film = JSON.parse(msg.content.toString());
            films.push(film);
            channel.ack(msg);
        }
    });
}

function getFilms() {
    return films;
}

function getWeeklyPlanning() {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return films.filter(film => {
        const projectionDate = new Date(film.date_projection);
        return projectionDate >= now && projectionDate <= nextWeek;
    }).sort((a, b) => new Date(a.date_projection) - new Date(b.date_projection));
}

module.exports = { startConsumer, getFilms, getWeeklyPlanning };
