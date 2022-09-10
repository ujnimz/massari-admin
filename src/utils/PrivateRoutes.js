import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
// REDUX
import {useSelector} from 'react-redux';

const PrivateRoutes = () => {
  const {isAuth} = useSelector(state => state.userState);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
