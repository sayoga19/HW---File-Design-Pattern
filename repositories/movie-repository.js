const { movies } = require("../models");

class MovieRepository {
  static async getAll(limit) {
    return await movies.findAll({ limit });
  }

  static async getById(id) {
    return await movies.findByPk(id);
  }

  static async createMovie(id, title, genres, year) {
    return await movies.create({ id, title, genres, year });
  }

  static async updateMovie(id, title, genres, year) {
    return await movies.update(
      { title, genres, year },
      { where: { id } }
    );
  }

  static async deleteMovie(id) {
    return await movies.destroy({ where: { id } });
  }

  static async uploadPhoto(id, filename) {
    const movie = await movies.findByPk(id);
    if (movie) {
      movie.photo = filename;
      await movie.save();
    }
    return movie;
  }
}

module.exports = MovieRepository;
