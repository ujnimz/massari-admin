import React from 'react';
import {Navigate} from 'react-router-dom';
// UI
import PageLayout from '../components/layouts/PageLayout';
import Loading from './Loading';
// STYLES
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
      <h1>Hi {user.name},</h1>
    </PageLayout>
  );
};

export default Dashboard;
