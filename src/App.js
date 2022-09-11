import React, {useMemo, useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// MUI
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// UI
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import PrivateRoutes from './utils/PrivateRoutes';
// DATA
import {useSelector, useDispatch} from 'react-redux';
import {authUser} from './redux/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const {mode} = useSelector(state => state.themeState);
  const {isAuth} = useSelector(state => state.userState);

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, dispatch]);

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
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path='/' exact />
            <Route path='/settings' element={<Settings />} />
          </Route>
          <Route element={<Login />} path='/login' />
          <Route element={<Register />} path='/register' />
          <Route element={<ForgotPassword />} path='/forgot-password' />
          <Route element={<NotFound />} path='*' />
        </Routes>
        <ToastContainer position='bottom-right' autoClose={2000} />
      </div>
    </ThemeProvider>
  );
}

export default App;
