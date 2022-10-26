// MUI
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// REDUX
import {useSelector, useDispatch} from 'react-redux';
import {changeTheme} from '../../../redux/slices/themeSlice';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const {mode} = useSelector(state => state.themeState);

  return (
    <>
      <IconButton
        onClick={() => dispatch(changeTheme())}
        size='large'
        aria-label='show 17 new notifications'
        color='inherit'
      >
        {mode !== 'light' ? <Brightness7Icon /> : <DarkModeIcon />}
      </IconButton>
    </>
  );
};

export default ThemeSwitch;
