import React, {useState} from 'react';
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
import {loginUser} from '../redux/slices/userSlice';

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

const ForgotPassword = () => {
  const [login, setLogin] = useState({email: '', password: ''});
  const state = useSelector(state => state.userState);
  const {isLoading} = state;

  const dispatch = useDispatch();

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

  return (
    <CenterLayout>
      <LoginWrapper maxWidth='sm'>
        <StyledTitle variant='h3' gutterBottom>
          Password Recovery
        </StyledTitle>

        <StyledSubTitle variant='subtitle1' gutterBottom>
          Tell us your email so we can send you a reset link
        </StyledSubTitle>

        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <StyledTextInput
            id='outlined-basic'
            label='Email'
            variant='outlined'
            name='email'
            onChange={handleChange}
          />

          <StyledButton type='submit' variant='contained' disabled={isLoading}>
            Recover Password
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
          <Link href='/login'>Log in to account</Link>
        </StyledLinkWrapper>
        <StyledLinkWrapper>
          <Link href='/register'>Create an account</Link>
        </StyledLinkWrapper>
      </LoginWrapper>
    </CenterLayout>
  );
};

export default ForgotPassword;
