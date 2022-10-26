import {Link} from 'react-router-dom';
// MUI
import {styled, useTheme} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import GroupIcon from '@mui/icons-material/Group';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';

// REDUX
import {useSelector, useDispatch} from 'react-redux';
import {
  switchDrawer,
  switchProductsMenu,
  switchCategoriesMenu,
} from '../../redux/slices/themeSlice';

// STYLES
const drawerWidth = 240;
const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: theme.palette.background.paper,
}));

export default function PersistentDrawerLeft() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const {drawerOpen, productOpen, categoryOpen} = useSelector(
    state => state.themeState,
  );

  const handleProductClick = () => {
    dispatch(switchProductsMenu());
  };

  const handleCategoryClick = () => {
    dispatch(switchCategoriesMenu());
  };

  const handleDrawer = () => {
    dispatch(switchDrawer());
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='persistent'
      anchor='left'
      open={drawerOpen}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawer}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/'>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItemButton>
        </ListItem>
        <ListItemButton onClick={handleProductClick}>
          <ListItemIcon>
            <LocalMallIcon />
          </ListItemIcon>
          <ListItemText primary='Products' />
          {productOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={productOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{pl: 9}} component={Link} to='/products'>
              <ListItemText primary='All Products' />
            </ListItemButton>
            <ListItemButton sx={{pl: 9}} component={Link} to='/products/new'>
              <ListItemText primary='Create New' />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={handleCategoryClick}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary='Categories' />
          {categoryOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={categoryOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{pl: 9}} component={Link} to='/categories'>
              <ListItemText primary='All Categories' />
            </ListItemButton>
            <ListItemButton sx={{pl: 9}} component={Link} to='/categories/new'>
              <ListItemText primary='Create New' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/orders'>
            <ListItemIcon>
              <ShoppingCartCheckoutIcon />
            </ListItemIcon>
            <ListItemText primary='Orders' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/customers'>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary='Customers' />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
