const MovieRepository = require("../repositories/movie-repository");

class MovieController {
  static async getAll(req, res, next) {
    try {
      const allMovies = await MovieRepository.getAll(req.query.limit);
      res.status(200).json(allMovies);
    } catch (error) {
      next(error);
    }
  }
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await MovieRepository.getById(id);
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).send("Movie not found");
      }
    } catch (error) {
      next(error);
    }
  }

  static async createMovie(req, res, next) {
    try {
      const { id, title, genres, year } = req.body;
      const newMovie = await MovieRepository.createMovie(id, title, genres, year);
      res
        .status(201)
        .json({ status: "success", message: "Movie created successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { title, genres, year } = req.body;
      const updateMovies = await MovieRepository.updateMovie(id, title, genres, year);
      res
        .status(201)
        .json({ status: "success", message: "Movie updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      await MovieRepository.deleteMovie(id);
      res
        .status(201)
        .json({ status: "success", message: "Movie deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async uploadPhoto(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await MovieRepository.uploadPhoto(id, req.file.filename);
      if (movie) {
        res.status(200).json({ message: 'Image uploaded successfully' });
      } else {
        res.status(404).send('Movie not found');
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
