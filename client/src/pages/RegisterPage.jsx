import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, Grid, Link, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Avatar from '@mui/material/Avatar';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, #2a2a2a 0%, #121212 100%)',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
          <PersonAddOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'secondary.main' }}>
          Join Us
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            sx={{ 
                mt: 4, 
                mb: 3, 
                height: 48, 
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 2
            }}
          >
            Create Account
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>
                Already have an account? <span style={{ color: '#fff', fontWeight: 'bold' }}>Sign In</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
