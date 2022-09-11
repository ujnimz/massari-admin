import React, {useState, useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
// MUI
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
// UI
import Loading from './Loading';
import CenterLayout from '../components/layouts/CenterLayout';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/slices/userSlice';

// STYLES
const LoginWrapper = styled(Container)(({theme}) => ({
  background: 'rgb(255, 255, 255)',
  border: 0,
  borderRadius: theme.spacing(2),
  boxShadow: 'rgb(100 116 139 / 12%) 0px 10px 15px',
  padding: theme.spacing(5),
}));
const StyledTitle = styled(Typography)(({theme}) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  textAlign: 'center',
}));
const StyledSubTitle = styled(Typography)(({theme}) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  fontWeight: 300,
  textAlign: 'center',
}));
const StyledTextInput = styled(TextField)(({theme}) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  fontWeight: 800,
}));
const StyledButton = styled(Button)(({theme}) => ({
  width: '100%',
  marginBottom: theme.spacing(5),
  fontWeight: 800,
  lineHeight: 3,
}));
const StyledDivider = styled(Divider)(({theme}) => ({
  marginBottom: theme.spacing(3),
}));
const StyledLinkWrapper = styled('div')(({theme}) => ({
  marginBottom: theme.spacing(1),
  fontSize: 14,
}));

const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState({name: '', email: '', password: ''});
  const state = useSelector(state => state.userState);
  const {isAuth, isLoading} = state;

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setLogin({...login, [name]: value});
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(registerUser(login));
    navigate('/login', {replace: true});
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <CenterLayout>
      <LoginWrapper maxWidth='sm'>
        <StyledTitle variant='h3' gutterBottom>
          Register
        </StyledTitle>

        <StyledSubTitle variant='subtitle1' gutterBottom>
          Register on the ecommerce platform
        </StyledSubTitle>

        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <StyledTextInput
            id='outlined-name-input'
            label='Name'
            variant='outlined'
            name='name'
            onChange={handleChange}
            value={login.name}
          />
          <StyledTextInput
            id='outlined-email-input'
            label='Email'
            variant='outlined'
            name='email'
            onChange={handleChange}
            value={login.email}
          />
          <StyledTextInput
            id='outlined-password-input'
            label='Password'
            type='password'
            name='password'
            autoComplete='current-password'
            onChange={handleChange}
            value={login.password}
          />
          <StyledButton type='submit' variant='contained' disabled={isLoading}>
            Register
          </StyledButton>

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

        <StyledDivider />

        <StyledLinkWrapper>
          <Link href='/login'>Have an account?</Link>
        </StyledLinkWrapper>
      </LoginWrapper>
    </CenterLayout>
  );
};

export default Register;
