const Movie = require('../models/Movie');
const queue = require('../utils/queue');
const moviesData = require('../data/movies.json');

// @desc    Get all movies with pagination and lazy insertion check
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Movie.countDocuments({});

    // Lazy Loading Simulation:
    // If DB is empty, push seeds to queue
    if (count === 0) {
      console.log('DB empty. Triggering lazy insertion...');
      moviesData.forEach((movie) => {
        queue.push(movie);
      });
      // Return the JSON data directly for the first call to avoid waiting
      // The queue will populate DB in background
       return res.json({ movies: moviesData.slice(0, pageSize), page, pages: Math.ceil(moviesData.length / pageSize) });
    }

    const movies = await Movie.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ movies, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Start search movies
// @route   GET /api/movies/search
// @access  Public
const searchMovies = async (req, res) => {
  const { query, description } = req.query; // ?query=Dark or ?description=crime
  
  // Requirement: Search by name OR description
  // If 'query' param is used, we search name. If strict requirement 'name or description', 
  // we can use a general keyword too. Let's support both specific params or a general 'q'.

  const keyword = req.query.q
    ? {
        $or: [
          { name: { $regex: req.query.q, $options: 'i' } },
          { description: { $regex: req.query.q, $options: 'i' } },
        ],
      }
    : {};

  const movies = await Movie.find({ ...keyword });
  res.json(movies);
};

// @desc    Get sorted movies
// @route   GET /api/movies/sorted
// @access  Public
const getSortedMovies = async (req, res) => {
  const { sortBy, order } = req.query; // sortBy=rating, order=desc
  
  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;
  } else {
    sortOptions['createdAt'] = -1; 
  }

  const movies = await Movie.find({}).sort(sortOptions);
  res.json(movies);
};

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private/Admin
const addMovie = async (req, res) => {
  const { name, description, rating, releaseDate, duration } = req.body;

  const movie = new Movie({
    name,
    description,
    rating,
    releaseDate,
    duration,
  });

  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
};

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
const updateMovie = async (req, res) => {
  const { name, description, rating, releaseDate, duration } = req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.name = name || movie.name;
    movie.description = description || movie.description;
    movie.rating = rating || movie.rating;
    movie.releaseDate = releaseDate || movie.releaseDate;
    movie.duration = duration || movie.duration;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
const deleteMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await movie.deleteOne();
    res.json({ message: 'Movie removed' });
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};

module.exports = {
  getMovies,
  searchMovies,
  getSortedMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
