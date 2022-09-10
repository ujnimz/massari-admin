import React from 'react';
// MUI
import {styled} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// STYLES
const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'rgb(255, 255, 255)',
}));

const Loading = () => {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
};

export default Loading;
