import {Link} from 'react-router-dom';
// MUI
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import StartIcon from '@mui/icons-material/Start';

// UI
import MainTitle from '../ui/elements/MainTitle';
import SubTitle from '../ui/elements/SubTitle';
import Body1Text from '../ui/elements/Body1Text';
// REDUX
import {useSelector} from 'react-redux';

const StyledCard = styled(Card)(({theme}) => ({
  background: theme.palette.primary.main,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
}));
const StyledButton = styled(Button)(({theme}) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    background: theme.palette.secondary.dark,
  },
}));

const UserWelcome = () => {
  const {user} = useSelector(state => state.userState);

  return (
    <StyledCard>
      <Box sx={{padding: 3}}>
        <CardMedia
          component='img'
          sx={{width: 151}}
          image='/welcome.svg'
          alt='Welcome'
        />
      </Box>

      <Box sx={{padding: 3}}>
        <CardContent>
          <MainTitle invert='true' title={` Hi ${user.name},`} />
          <SubTitle
            invert='true'
            title='Welcome back to Massari Store Manager'
          />
          <Body1Text
            invert='true'
            text='Your dashboard has been improved! Explore new features like Notifications, Search, and more.'
          />
        </CardContent>
        <CardActions>
          <StyledButton
            component={Link}
            variant='contained'
            endIcon={<StartIcon />}
            to='/products'
          >
            View Products
          </StyledButton>
        </CardActions>
      </Box>
    </StyledCard>
  );
};

export default UserWelcome;
