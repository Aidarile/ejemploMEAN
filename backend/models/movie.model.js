const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: { type: String, required: true },
  year: Number, // Si solo ponemos el tipo, será un campo opcional
  director: { type: String, required: true },
  plot: { type: String, required: true },
  genres: [{ type: String, required: true }],
  poster: { type: String, required: true },
  imdb: {
    rating: { type: Number, required: true },
    votes: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Movie", movieSchema, "movies2425");