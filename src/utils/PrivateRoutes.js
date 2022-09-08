import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
// REDUX
import {useSelector} from 'react-redux';

const PrivateRoutes = () => {
  const {isAuth, user} = useSelector(state => state.userState);

  console.log(user);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
