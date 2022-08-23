import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {makeStyles} from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from './Loading';
import {useSnackbar} from 'notistack';
// DATA
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../redux/slices/userSlice';

const Login = () => {
  const classes = useStyles();
  const [login, setLogin] = useState({email: '', password: ''});
  const state = useSelector(state => state.userState);
  const {user, isLoading, error} = state;

  const {enqueueSnackbar} = useSnackbar();

  const dispatch = useDispatch();

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
    return <Loading />;
  }

  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth='sm'>
        <Box
          className={classes.form}
          component='form'
          sx={{
            '& > :not(style)': {m: 1, width: '100%'},
          }}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <TextField
            className={classes.input}
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
      </Container>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
  },
  container: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 15,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    width: '100%',
  },
});

export default Login;
