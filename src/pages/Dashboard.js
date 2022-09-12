import React from 'react';
// UI
import PageLayout from '../components/layouts/PageLayout';
import Loading from './Loading';
import UserWelcome from '../components/body/UserWelcome';
// REDUX
import {useSelector} from 'react-redux';

const Dashboard = () => {
  const {isLoading} = useSelector(state => state.userState);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageLayout>
      <UserWelcome />
    </PageLayout>
  );
};

export default Dashboard;
