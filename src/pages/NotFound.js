import React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PageWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'rgb(255, 255, 255)',
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
