import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const MovieCard = ({ movie }) => {
  return (
    <Card 
        sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: '#1e1e1e',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            cursor: 'pointer',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                zIndex: 10
            }
        }}
    >
      <CardMedia
        component="img"
        height="180" 
        image={movie.poster || 'https://placehold.co/150x225?text=No+Img'}
        alt={movie.name}
        sx={{ objectFit: 'cover' }}
        referrerPolicy="no-referrer"
        onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/300x450?text=Image+Not+Found'
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 1.5, pb: '8px !important' }}>
        <Typography variant="subtitle1" component="div" sx={{ lineHeight: 1.2, mb: 1, fontWeight: 'bold' }}>
          {movie.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
            {new Date(movie.releaseDate).getFullYear()} • {movie.duration}m
            </Typography>
             <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 180, 0, 0.1)', px: 0.5, borderRadius: 1 }}>
                <StarIcon sx={{ fontSize: 16, color: '#ffb400', mr: 0.2 }} />
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#ffb400' }}>
                    {movie.rating}
                </Typography>
            </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
