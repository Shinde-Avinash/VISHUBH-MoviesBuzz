const axios = require('axios');
const cheerio = require('cheerio');

const scrapeTop250 = async () => {
  try {
    const { data } = await axios.get('https://www.imdb.com/chart/top/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const $ = cheerio.load(data);
    const movies = [];

    // IMDb's list is usually within a specific UL or list container
    // Class names on IMDb are often hashed (e.g., ipc-metadata-list), so we try to target semantic or partial matches if possible, 
    // but usually checking specific classes like .ipc-metadata-list-summary-item is needed.
    // As of late 2024/2025, IMDb uses IPC components.
    
    // Select the list items. The list often has class 'ipc-metadata-list'
    $('.ipc-metadata-list li.ipc-metadata-list-summary-item').each((index, element) => {
      if (index >= 250) return; // Limit to 250

      const titleElement = $(element).find('.ipc-title__text');
      const title = titleElement.text().replace(/^\d+\.\s/, '').trim(); // Remove "1. " ranking

      // Metadata: Year, Duration, Rating are usually in spans below title
      const metadataItems = $(element).find('.cli-title-metadata span');
      const year = $(metadataItems[0]).text().trim() || '2000';
      const durationStr = $(metadataItems[1]).text().trim() || '120m';
      
      // Parse duration to minutes (e.g., "2h 22m")
      let duration = 0;
      const hoursMatch = durationStr.match(/(\d+)h/);
      const minsMatch = durationStr.match(/(\d+)m/);
      if (hoursMatch) duration += parseInt(hoursMatch[1]) * 60;
      if (minsMatch) duration += parseInt(minsMatch[1]);
      if (duration === 0) duration = 120; // fallback

      const ratingElement = $(element).find('.ipc-rating-star--base');
      const rating = parseFloat(ratingElement.text().trim()) || 0;

      const imageElement = $(element).find('img.ipc-image');
      let poster = imageElement.attr('src');
      
      // IMDb often uses low-res in src, and srcset for better ones. 
      // Need to clean URL to get higher res (remove @_V1_... .jpg)
      if (poster) {
        // Example: https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX67_CR0,0,67,98_AL_.jpg
        // Replace with: https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg
        // Or simply remove the transformation params
        poster = poster.replace(/_V1_.*\.jpg$/, '_V1_FMjpg_UX1000_.jpg');
      }

      movies.push({
        name: title,
        rating,
        year: parseInt(year),
        duration,
        poster, // Add poster to object
        // Add a default description since it's hard to scrape from list view without extra requests
        description: `${title} is one of the highest-rated movies of all time, released in ${year}. Rated ${rating}/10 on IMDb.` 
      });
    });

    return movies;
  } catch (error) {
    console.error('Error scraping IMDb:', error.message);
    return [];
  }
};

module.exports = scrapeTop250;
