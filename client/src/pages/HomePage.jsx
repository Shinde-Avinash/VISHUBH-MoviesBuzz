import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Pagination, Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, Container, Paper } from '@mui/material';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);
  
  const fetchMovies = async (pageNumber = 1) => {
    setLoading(true);
    try {
      if (sortBy) {
        const { data } = await axios.get(`/api/movies/sorted?sortBy=${sortBy}&order=desc`);
        setMovies(data);
        setPages(1); 
      } else {
        const { data } = await axios.get(`/api/movies?pageNumber=${pageNumber}`);
        setMovies(data.movies);
        setPage(data.page);
        setPages(data.pages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page, sortBy]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom, #141414 0%, #000000 100%)',
        p: 3
    }}>
      <Container maxWidth="xl">
        <Paper 
            elevation={0}
            sx={{ 
                p: 3, 
                mb: 4, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 800, background: '-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Trending Now
            </Typography>
            <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Sort By</InputLabel>
            <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ 
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e50914' },
                    '.MuiSvgIcon-root': { color: 'white' }
                }}
            >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
                <MenuItem value="releaseDate">Newest Releases</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
            </Select>
            </FormControl>
        </Paper>

        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress color="secondary" size={60} thickness={4} />
            </Box>
        ) : (
            <>
                <Grid container spacing={3}>
                    {movies.map((movie) => (
                    <Grid item key={movie._id} xs={6} sm={4} md={2}>
                        <MovieCard movie={movie} />
                    </Grid>
                    ))}
                </Grid>
                
                {!sortBy && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
                        <Pagination 
                            count={pages} 
                            page={page} 
                            onChange={handlePageChange} 
                            color="primary" 
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': { color: 'white' },
                                '& .Mui-selected': { backgroundColor: '#e50914 !important', fontWeight: 'bold' }
                            }}
                        />
                    </Box>
                )}
            </>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
