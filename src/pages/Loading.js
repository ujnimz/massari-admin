import React from 'react';
// MUI
import {styled} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// STYLES
const PageWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'rgb(255, 255, 255)',
}));

const Loading = () => {
  return (
    <PageWrapper>
      <Box sx={{display: 'flex'}}>
        <CircularProgress />
      </Box>
    </PageWrapper>
  );
};

export default Loading;
