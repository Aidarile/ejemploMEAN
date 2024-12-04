const Movie = require('../models/movie.model');
const movieCtrl = {};

// Función que devuelve todas las películas:

movieCtrl.getMovies = async (req, res) => {
    const movies = await Movie.find().then((data) => res.status(200).json({status: data}))
    .catch((err) => res.status(400).send(err));
};

// Función que devuelve una película según su ID:

movieCtrl.getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id).then((data) => 
        {
        if (data != null) res.status(200).json({status: data})
            else res.status(404).json({status: 'Movie Not Found'})
        }) 
    .catch((err) => res.status(400).json({status: err}));
};

// Función que crea una pelicula nueva:

movieCtrl.addMovie = async (req, res) => {
    const movie = new Movie(req.body);
    await movie.save().then((data) => res.status(201).json({status: 'Movie Successfully Inserted'})
).catch((err) => res.status(400).json({status: err}));
};

// Función que actualiza una pelicula:

movieCtrl.updateMovie = async (req, res) => {
    const movie = req.body;
    await Movie.findByIdAndUpdate (
        req.params.id,
        {$set: movie},
        {new: true}).then ((data) => {
            if(data)res.status(200).json({status: 'Movie Successfully Updated'})
                else res.status(404).json({status: 'Movie Not Found'})
        }) 
        .catch((err) => res.status(400).json({status: err}));
};

// Función que elimina una pelicula:

movieCtrl.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete (req.params.id).then ((data) => {
            if(data)res.status(200).json({status: 'Movie Successfully Deleted'})
                else res.status(404).json({status: 'Movie Not Found'})
        }) 
        .catch((err) => res.status(400).json({status: err}));
};

// Función que busca por género una pelicula:

movieCtrl.getGenres = async (req, res) => {
    await Movie.find().distinct('genres').then(() => {
        res.status(200).json({status: data})
    })
    .catch((err) => res.status(400).json({status: err}));
};

module.exports = movieCtrl;