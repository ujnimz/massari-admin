import React, {useMemo, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';

// DATA
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from './redux/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const {mode} = useSelector(state => state.themeState);
  const {user} = useSelector(state => state.userState);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                  main: '#5048E4',
                },
                divider: '#e6e8f0',
                text: {
                  primary: '#121828',
                  secondary: '#65748b',
                },
                background: {
                  default: '#F9FAFC',
                  paper: '#FFFFFF',
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: '#7582EB',
                },
                divider: '#2d3748',
                text: {
                  primary: '#ffffff',
                  secondary: '#a0aec0',
                },
                background: {
                  default: '#0A0F19',
                  paper: '#111827',
                },
              }),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: 'grey',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app' style={{height: '100%'}}>
        <Routes>
          <Route index path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
