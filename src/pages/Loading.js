import React from 'react';
import {styled, alpha} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
