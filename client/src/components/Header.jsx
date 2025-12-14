import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(18, 18, 18, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <MovieFilterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#e50914' }} />
            <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                VISHUBH MoviesBuzz
            </Typography>

            {user && (
                <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: '#aaa', flexGrow: 1 }}>
                  
                </Typography>
            )}
             {!user && <Box sx={{ flexGrow: 1 }} />}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button component={RouterLink} to="/" sx={{ color: 'white', '&:hover': { color: '#e50914' } }}>Home</Button>
                <Button component={RouterLink} to="/search" sx={{ color: 'white', '&:hover': { color: '#e50914' } }}>Search</Button>
                
                {user && user.role === 'admin' && (
                    <Button component={RouterLink} to="/admin" sx={{ color: '#ffcc00', borderColor: '#ffcc00' }} variant="outlined" size="small">Admin</Button>
                )}
                
                {user ? (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button component={RouterLink} to="/profile" sx={{ color: 'white', '&:hover': { color: '#e50914' }, textTransform: 'none', fontWeight: 'bold' }}>
                            {user.name}
                        </Button>
                        <Button 
                            onClick={handleLogout} 
                            variant="contained" 
                            color="error" 
                            size="small"
                            sx={{ borderRadius: 20, px: 3 }}
                        >
                        Logout
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ gap: 1, display: 'flex' }}>
                         <Button component={RouterLink} to="/login" sx={{ color: 'white' }}>Login</Button>
                         <Button component={RouterLink} to="/register" variant="contained" color="primary" sx={{ borderRadius: 20 }}>Sign Up</Button>
                    </Box>
                   
                )}
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
