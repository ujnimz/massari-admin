// MUI
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledTypography = styled(Typography)(({theme}) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

const MainTitle = ({title}) => {
  return (
    <StyledTypography variant='h3' component='h1' gutterBottom>
      {title}
    </StyledTypography>
  );
};

export default MainTitle;
