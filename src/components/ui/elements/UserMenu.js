import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// DATA
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../../redux/slices/userSlice';

export default function UserMenu() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.userState);
  const {user} = state;

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <React.Fragment>
      <MenuItem>
        <Avatar /> {user.name}
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <PersonAdd fontSize='small' />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem>
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
    </React.Fragment>
  );
}
