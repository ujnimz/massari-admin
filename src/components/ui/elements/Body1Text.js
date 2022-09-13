// MUI
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledTypography = styled(Typography)(({theme, invert}) => ({
  color:
    invert === 'true'
      ? theme.palette.background.default
      : theme.palette.primary.contrastText,
}));

const Body1Text = ({text, invert = 'false'}) => {
  return (
    <StyledTypography invert={invert} variant='body1' gutterBottom>
      {text}
    </StyledTypography>
  );
};

export default Body1Text;
