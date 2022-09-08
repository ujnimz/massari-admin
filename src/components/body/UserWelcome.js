import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

// UI
import MainTitle from '../ui/elements/MainTitle';
import SubTitle from '../ui/elements/SubTitle';
import Body1Text from '../ui/elements/Body1Text';
// REDUX
import {useSelector} from 'react-redux';

const StyledCard = styled(Card)(({theme}) => ({
  background: theme.palette.primary.main,
  padding: theme.spacing(5),
  borderRadius: theme.spacing(1),
}));

const UserWelcome = () => {
  const {user} = useSelector(state => state.userState);

  return (
    <StyledCard>
      <CardContent>
        <MainTitle title={` Hi ${user.name},`} />
        <SubTitle title='Welcome back to Massari Store Manager' />
        <Body1Text text='Your dashboard has been improved! Explore new features like Notifications, Search, and more.' />
      </CardContent>

      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </StyledCard>
  );
};

export default UserWelcome;
