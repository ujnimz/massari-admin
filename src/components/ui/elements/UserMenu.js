import {Link} from 'react-router-dom';
// MUI
import {styled} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// REDUX
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../../redux/slices/userSlice';

// STYLES
const StyledMenuItem = styled(MenuItem)(({theme}) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

export default function UserMenu() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.userState);
  const {user} = state;

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <StyledMenuItem>{user.name}</StyledMenuItem>
      <Divider />
      {user.role === 'admin' ? (
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>
      ) : (
        ''
      )}
      <MenuItem component={Link} to='/settings'>
        <ListItemIcon>
          <Settings fontSize='small' />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </>
  );
}
