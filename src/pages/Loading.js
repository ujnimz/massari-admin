import React from 'react';

import {makeStyles} from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box sx={{display: 'flex'}}>
        <CircularProgress />
      </Box>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgb(255, 255, 255)',
  },
});

export default Loading;
