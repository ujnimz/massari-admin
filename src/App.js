import React, {useMemo} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signin from './pages/Signin';
import ForgotPassword from './pages/ForgotPassword';

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
        {/* <Header /> */}
        {/* <Switch onChange={() => dispatch(changeTheme())} /> */}
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signin />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
