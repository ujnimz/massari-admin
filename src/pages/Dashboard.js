import {Navigate} from 'react-router-dom';
import React, {useEffect} from 'react';
import PageLayout from '../components/layouts/PageLayout';
import Loading from './Loading';
// DATA
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../redux/slices/userSlice';

const Dashboard = () => {
  const userState = useSelector(state => state.userState);
  const {user, isLoading} = userState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <PageLayout>
      <h1>Hi {user.name},</h1>
    </PageLayout>
  );
};

export default Dashboard;
