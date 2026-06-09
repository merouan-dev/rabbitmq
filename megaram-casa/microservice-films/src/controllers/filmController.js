const { publishFilm } = require('../rabbitmq/producer');

exports.addFilm = async (req, res) => {
    try {
        const { id_film, titre, durée, lienTelechargement, date_projection } = req.body;
        
        const newFilm = {
            id_film,
            titre,
            durée,
            lienTelechargement,
            date_projection: new Date(date_projection)
        };
        
        await publishFilm(newFilm);
        
        res.status(201).json({
            message: "Film ajouté et publié dans la queue",
            film: newFilm
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
