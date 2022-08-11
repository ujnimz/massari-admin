import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
//import {styled, alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import {useSnackbar} from 'notistack';
// DATA
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../redux/slices/userSlice';

const Login = () => {
  const [login, setLogin] = useState({email: '', password: ''});
  const state = useSelector(state => state.userState);
  const {isAuthenticated, user, isLoading, error} = state;

  const {enqueueSnackbar} = useSnackbar();

  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, {variant: 'error'});
    }
    return () => {
      //closeSnackbar(key);
    };
  }, [error, enqueueSnackbar]);

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setLogin({...login, [name]: value});
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(loginUser(login));
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading..</h1>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container maxWidth='sm'>
      <div className=' '>
        <Box
          component='form'
          sx={{
            '& > :not(style)': {m: 1, width: '25ch'},
          }}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            name='email'
            onChange={handleChange}
          />
          <TextField
            id='outlined-password-input'
            label='Password'
            type='password'
            name='password'
            autoComplete='current-password'
            onChange={handleChange}
          />

          <Button type='submit' variant='contained' disabled={isLoading}>
            Submit
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'primary',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </div>
    </Container>
  );
};

export default Login;
