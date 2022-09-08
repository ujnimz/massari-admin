import React from 'react';
import {Navigate} from 'react-router-dom';
// UI
import PageLayout from '../components/layouts/PageLayout';
import Loading from './Loading';
import UserWelcome from '../components/body/UserWelcome';
// REDUX
import {useSelector} from 'react-redux';

const Dashboard = () => {
  const {user, isLoading} = useSelector(state => state.userState);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <PageLayout>
      <UserWelcome />
    </PageLayout>
  );
};

export default Dashboard;
