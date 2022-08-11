import React, {useMemo} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';

import {amber, grey, deepOrange, deepPurple} from '@mui/material/colors';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Header from './components/header/Header';

// DATA
import {useSelector, useDispatch} from 'react-redux';
import {changeTheme} from './redux/slices/themeSlice';

function App() {
  const dispatch = useDispatch();
  const {mode} = useSelector(state => state.themeState);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: deepPurple,
                divider: amber[200],
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
                background: {
                  default: '#fff',
                  paper: '#fff',
                },
              }
            : {
                // palette values for dark mode
                primary: deepOrange,
                divider: deepOrange[700],
                text: {
                  primary: '#fff',
                  secondary: grey[500],
                },
                background: {
                  default: grey[900],
                  paper: grey[900],
                },
              }),
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app'>
        {/* <Header /> */}
        <Switch onChange={() => dispatch(changeTheme())} />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='login' element={<Login />} />
          <Route path='signin' element={<Signin />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
