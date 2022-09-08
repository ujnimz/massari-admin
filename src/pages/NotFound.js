import React from 'react';
// MUI
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// STYLES
const PageWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: theme.palette.primary,
}));

const NotFound = () => {
  return (
    <PageWrapper>
      <Box sx={{display: 'flex'}}>
        <Typography variant='h2' gutterBottom>
          Oops! 404
        </Typography>
      </Box>
    </PageWrapper>
  );
};

export default NotFound;
