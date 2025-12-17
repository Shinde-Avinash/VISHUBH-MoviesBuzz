import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { Box, TextField, Button, Grid, Typography, Container, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import MovieCard from '../components/MovieCard';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const { data } = await api.get(`/movies/search?q=${query}`);
      setMovies(data);
      setSearched(true);
    } catch (error) {
      console.error(error);
    } finally {
        setLoading(false);
    }
  };
  
  const clearSearch = () => {
      setQuery('');
      setSearched(false);
      setMovies([]);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#121212', p: 3 }}>
        <Container maxWidth="xl">
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    mb: 6, 
                    mt: 4
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, letterSpacing: '-1px' }}>
                    Find Your Next Favorite
                </Typography>
                
                <Box 
                    component="form" 
                    onSubmit={handleSearch} 
                    sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        width: '100%', 
                        maxWidth: 700,
                        position: 'relative' 
                    }}
                >
                    <TextField
                    fullWidth
                    placeholder="Search for movies, genres, or keywords..."
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                             <SearchIcon sx={{ color: 'text.secondary' }} />
                           </InputAdornment>
                        ),
                        endAdornment: query && (
                            <InputAdornment position="end">
                              <IconButton onClick={clearSearch}>
                                <ClearIcon />
                              </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 10,
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            pr: 2,
                            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                            '&.Mui-focused fieldset': { borderColor: '#e50914' },
                        }
                    }}
                    />
                    <Button 
                        variant="contained" 
                        size="large" 
                        type="submit"
                        disabled={loading}
                        sx={{ 
                            borderRadius: 10, 
                            px: 4, 
                            backgroundColor: '#e50914', 
                            '&:hover': { backgroundColor: '#b20710' },
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                    </Button>
                </Box>
            </Box>

            {searched && movies.length === 0 && !loading && (
                <Box sx={{ textAlign: 'center', mt: 8, opacity: 0.7 }}>
                     <Typography variant="h5">Nothing found for "{query}"</Typography>
                     <Typography variant="body1">Try a different keyword or check the spelling.</Typography>
                </Box>
            )}

            <Grid container spacing={3}>
                {movies.map((movie) => (
                <Grid item key={movie._id} xs={6} sm={4} md={2}>
                    <MovieCard movie={movie} />
                </Grid>
                ))}
            </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;
