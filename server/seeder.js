const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/User');
const Movie = require('./models/Movie');
const connectDB = require('./config/db');
const scrapeTop250 = require('./utils/scraper');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Movie.deleteMany();

    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    await User.create({
      name: 'Simple User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user',
    });

    console.log('Fetching movies from IMDb... this may take a moment...');
    const movies = await scrapeTop250();

    if (movies.length === 0) {
        console.log('Scraping failed or returned no data. Using fallback data.'.yellow);
        // Fallback or exit? Let's generate some placeholder if scraping fails just so the app isn't empty
          const fallbackMovies = [];
          for (let i = 1; i <= 20; i++) {
            fallbackMovies.push({
              name: `Fallback Movie #${i}`,
              description: `Description for movie #${i}. Scraper failed.`,
              rating: 7.5,
              releaseDate: new Date(),
              duration: 120,
              poster: 'https://placehold.co/300x450?text=No+Data'
            });
          }
          await Movie.insertMany(fallbackMovies);
    } else {
        // Map scraped data to correct schema fields just in case
        const formattedMovies = movies.map(m => ({
            name: m.name,
            description: m.description,
            rating: m.rating,
            releaseDate: new Date(`${m.year}-01-01`),
            duration: m.duration,
            poster: m.poster
        }));
        
        await Movie.insertMany(formattedMovies);
    }
    
    console.log(`Seeded Users and ${movies.length} Movies!`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Movie.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
