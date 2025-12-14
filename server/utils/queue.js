const fastq = require('fastq');
const Movie = require('../models/Movie');

// Worker function to insert movie into DB
const worker = async (task, cb) => {
  try {
    const exists = await Movie.findOne({ name: task.name });
    if (!exists) {
      await Movie.create(task);
      console.log(`Lazily inserted: ${task.name}`);
    }
    cb(null);
  } catch (error) {
    console.error(`Error inserting ${task.name}: ${error.message}`);
    cb(error);
  }
};

// Concurrency of 1 (process one at a time to be safe, or higher for speed)
const queue = fastq.promise(worker, 1);

module.exports = queue;
