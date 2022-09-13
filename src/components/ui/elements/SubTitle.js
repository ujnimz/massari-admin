// MUI
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledTypography = styled(Typography)(({theme, invert}) => ({
  fontWeight: theme.typography.fontWeightBold,
  color:
    invert === 'true'
      ? theme.palette.background.default
      : theme.palette.primary.contrastText,
}));

const SubTitle = ({title, invert = 'false'}) => {
  return (
    <StyledTypography invert={invert} variant='h5' component='h2' gutterBottom>
      {title}
    </StyledTypography>
  );
};

export default SubTitle;
