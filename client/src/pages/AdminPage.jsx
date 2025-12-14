import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Container, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({ name: '', description: '', rating: '', releaseDate: '', duration: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
        const { data } = await axios.get('/api/movies/sorted');
        setMovies(data);
    } catch (error) {
        console.error("Failed to fetch movies", error);
    }
  };

  const handleOpen = (movie = null) => {
    if (movie) {
      setEditMode(true);
      const formattedDate = new Date(movie.releaseDate).toISOString().split('T')[0];
      setCurrentMovie({ ...movie, releaseDate: formattedDate });
    } else {
      setEditMode(false);
      setCurrentMovie({ name: '', description: '', rating: '', releaseDate: '', duration: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (editMode) {
        await axios.put(`/api/movies/${currentMovie._id}`, currentMovie, config);
      } else {
        await axios.post('/api/movies', currentMovie, config);
      }
      setOpen(false);
      fetchMovies();
    } catch (error) {
      console.error(error);
      alert('Error saving movie');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(`/api/movies/${id}`, config);
        fetchMovies();
      } catch (error) {
        console.error(error);
        alert('Error deleting movie');
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#121212', p: 3 }}>
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold">Admin Dashboard</Typography>
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />} 
                    onClick={() => handleOpen()}
                    sx={{ borderRadius: 2, background: 'linear-gradient(45deg, #e50914 30%, #ff5252 90%)' }}
                >
                Add Movie
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={5} sx={{ backgroundColor: '#1e1e1e', borderRadius: 3 }}>
                <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <TableCell sx={{ color: '#aaa', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: '#aaa', fontWeight: 'bold' }}>Rating</TableCell>
                    <TableCell sx={{ color: '#aaa', fontWeight: 'bold' }}>Duration</TableCell>
                    <TableCell align="right" sx={{ color: '#aaa', fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {movies.map((movie) => (
                    <TableRow key={movie._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={{ color: 'white', fontWeight: 500 }}>{movie.name}</TableCell>
                        <TableCell>
                            <Chip label={movie.rating} size="small" sx={{ bgcolor: '#ffb400', color: 'black', fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell sx={{ color: '#ddd' }}>{movie.duration}m</TableCell>
                        <TableCell align="right">
                        <IconButton onClick={() => handleOpen(movie)} sx={{ color: '#4fc3f7' }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(movie._id)} sx={{ color: '#ef5350' }}>
                            <DeleteIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { bgcolor: '#1e1e1e', color: 'white', minWidth: 400 } }}>
                <DialogTitle>{editMode ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    fullWidth
                    variant="filled"
                    value={currentMovie.name}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, name: e.target.value })}
                    sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    variant="filled"
                    value={currentMovie.description}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, description: e.target.value })}
                    sx={{ textarea: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
                />
                <TextField
                    margin="dense"
                    label="Rating (0-10)"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={currentMovie.rating}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, rating: e.target.value })}
                     sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
                />
                <TextField
                    margin="dense"
                    label="Release Date"
                    type="date"
                    fullWidth
                    variant="filled"
                    InputLabelProps={{ shrink: true }}
                    value={currentMovie.releaseDate}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, releaseDate: e.target.value })}
                     sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
                />
                <TextField
                    margin="dense"
                    label="Duration (minutes)"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={currentMovie.duration}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, duration: e.target.value })}
                     sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '.MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
                />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleClose} sx={{ color: '#aaa' }}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#e50914' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    </Box>
  );
};

export default AdminPage;
