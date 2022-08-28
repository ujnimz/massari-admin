import React from 'react';
import {styled, alpha} from '@mui/material/styles';

const PageWrapper = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const CenterLayout = ({children}) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default CenterLayout;
