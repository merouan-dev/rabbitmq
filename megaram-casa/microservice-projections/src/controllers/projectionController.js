const { getFilms, getWeeklyPlanning } = require('../rabbitmq/consumer');

exports.getFilms = (req, res) => {
    try {
        const films = getFilms();
        res.status(200).json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPlanning = (req, res) => {
    try {
        const planning = getWeeklyPlanning();
        res.status(200).json(planning);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
