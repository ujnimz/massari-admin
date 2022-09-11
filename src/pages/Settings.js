import {useState, useEffect} from 'react';
// MUI
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
// UI
import PageLayout from '../components/layouts/PageLayout';
import Loading from './Loading';
import MainTitle from '../components/ui/elements/MainTitle';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../redux/slices/userSlice';

const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
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
const UploadButton = styled(Button)(({theme}) => ({
  marginBottom: theme.spacing(5),
  fontWeight: 800,
}));
const StyledAvatar = styled(Button)(({theme}) => ({
  marginBottom: theme.spacing(5),
}));

const Settings = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState({name: '', email: '', avatar: ''});
  const {isLoading, user} = useSelector(state => state.userState);

  useEffect(() => {
    setLogin({...login, ...user});
    return () => {
      setLogin(null);
    };
  }, [user]);

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setLogin({...login, [name]: value});
  };

  const handleAvatar = event => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = e => {
      setLogin({
        ...login,
        avatar: {
          public_id: '',
          url: e.target.result,
        },
      });
    };
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(updateUser(login));
  };

  if (isLoading) {
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Container maxWidth='lg'>
        <MainTitle title='Account Settings' />
        <Item>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <Grid container>
              <Grid xs={12}>
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

                <StyledAvatar>
                  {login.avatar !== '' ? (
                    <Avatar alt={login.name} src={login.avatar.url} />
                  ) : (
                    <AccountCircle />
                  )}
                </StyledAvatar>

                <UploadButton variant='contained' component='label'>
                  Select Avatar
                  <input
                    accept='image/*'
                    type='file'
                    name='avatar'
                    onChange={handleAvatar}
                    hidden
                  />
                </UploadButton>

                <StyledButton
                  type='submit'
                  variant='contained'
                  disabled={isLoading}
                >
                  Update
                </StyledButton>
              </Grid>
            </Grid>
          </Box>
        </Item>
      </Container>
    </PageLayout>
  );
};

export default Settings;
