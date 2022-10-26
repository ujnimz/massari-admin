// MUI
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationsButton = () => {
  return (
    <IconButton
      size='large'
      aria-label='show 17 new notifications'
      color='inherit'
    >
      <Badge badgeContent={17} color='error'>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default NotificationsButton;
