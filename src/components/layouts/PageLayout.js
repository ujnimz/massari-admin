import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
// MUI
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';

// DATA
import {useSelector} from 'react-redux';

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: prop => prop !== 'open'})(
  ({theme, open}) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  }),
);

const StyledBox = styled(Box)(({theme}) => ({
  background: theme.palette.background.default,
  padding: theme.spacing(3),
  minHeight: '100vh',
}));

const PageLayout = ({children}) => {
  const {drawerOpen} = useSelector(state => state.themeState);

  return (
    <>
      <Main open={drawerOpen}>
        <Header />
        <StyledBox>{children}</StyledBox>
        <Footer />
      </Main>
    </>
  );
};

export default PageLayout;
