// MUI
import Typography from '@mui/material/Typography';

const SubTitle = ({title}) => {
  return (
    <Typography variant='h5' component='h2' gutterBottom>
      {title}
    </Typography>
  );
};

export default SubTitle;
