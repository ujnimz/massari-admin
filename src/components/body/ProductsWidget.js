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
import SubTitle from '../ui/elements/SubTitle';
import Body1Text from '../ui/elements/Body1Text';
// REDUX
//import {useSelector} from 'react-redux';

const StyledCard = styled(Card)(({theme}) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
}));
const StyledButton = styled(Button)(({theme}) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

const ProductsWidget = () => {
  //const {user} = useSelector(state => state.userState);

  const title = 'Check out the products';
  const count = 10;

  return (
    <StyledCard elevation={1}>
      <Box sx={{padding: 3}}>
        <CardMedia
          component='img'
          sx={{width: 151}}
          image='/products.svg'
          alt='Products'
        />
      </Box>

      <Box sx={{padding: 3}}>
        <CardContent>
          <SubTitle title={`${count} Products`} />
          <Body1Text text={title} />
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

export default ProductsWidget;
