import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import SearchPage from './pages/SearchPage';
import { useAuth } from './context/AuthContext';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import api from './api/axiosConfig';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const [connectionStatus, setConnectionStatus] = useState(null); // 'success' | 'error' | null
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await api.get('/');
        setConnectionStatus('success');
      } catch (error) {
        setConnectionStatus('error');
      } finally {
        setOpenSnackbar(true);
      }
    };

    checkConnection();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Header />
      <Box component="main" sx={{ p: 3 }}>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } />
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly={true}>
                  <AdminPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={connectionStatus === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {connectionStatus === 'success' ? 'Backend Connected Successfully!' : 'Failed to connect to Backend.'}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
