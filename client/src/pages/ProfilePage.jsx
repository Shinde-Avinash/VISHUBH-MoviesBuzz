import React from 'react';
import { Box, Typography, Container, Paper, Avatar, Grid, Chip, Divider, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
        <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
            <Typography variant="h5" color="error">Access Denied. Please Login.</Typography>
        </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#121212', p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="md">
        <Paper 
            elevation={10} 
            sx={{ 
                p: 5, 
                borderRadius: 4, 
                background: 'rgba(30, 30, 30, 0.9)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box 
                sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: 150, 
                    background: 'linear-gradient(90deg, #e50914 0%, #ff5252 100%)',
                    zIndex: 0
                }} 
            />
            
            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                 <Avatar 
                    sx={{ 
                        width: 120, 
                        height: 120, 
                        bgcolor: '#121212', 
                        border: '5px solid #121212',
                        fontSize: 60,
                        mb: 2
                    }}
                >
                    {user.name.charAt(0).toUpperCase()}
                </Avatar>
                
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {user.name}
                </Typography>
                <Chip 
                    label={user.role.toUpperCase()} 
                    size="small" 
                    sx={{ 
                        mt: 1, 
                        bgcolor: user.role === 'admin' ? '#ffcc00' : '#e50914', 
                        color: 'black', 
                        fontWeight: 'bold',
                        px: 1
                    }} 
                />

                <Grid container spacing={4} sx={{ mt: 5, width: '100%' }}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <EmailIcon sx={{ color: '#aaa', mr: 2 }} />
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#777' }}>Email Address</Typography>
                                    <Typography variant="body1">{user.email}</Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <VerifiedUserIcon sx={{ color: '#aaa', mr: 2 }} />
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#777' }}>Member Status</Typography>
                                    <Typography variant="body1" sx={{ color: '#4caf50' }}>Active</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, height: '100%' }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Account Actions</Typography>
                             <Button 
                                variant="outlined" 
                                color="error" 
                                fullWidth 
                                onClick={() => { logout(); navigate('/login'); }}
                                sx={{ borderRadius: 2 }}
                            >
                                Sign Out
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
