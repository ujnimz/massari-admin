import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

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

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const PageLayout = ({children}) => {
  const {drawerOpen} = useSelector(state => state.themeState);

  return (
    <>
      <Main open={drawerOpen}>
        <Header />
        {/* <DrawerHeader /> */}
        {children}
        <Footer />
      </Main>
    </>
  );
};

export default PageLayout;
