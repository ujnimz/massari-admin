import React from 'react';
// MUI
import {styled} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// STYLES
const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  alignItems: 'center',
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

const Loading = () => {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
};

export default Loading;
