import {Navigate} from 'react-router-dom';
import React from 'react';
// DATA
import {useSelector} from 'react-redux';

const Dashboard = () => {
  const userState = useSelector(state => state.userState);
  const {isAuthenticated, isLoading} = userState;

  if (isLoading) {
    return (
      <div>
        <h1>Loading..</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
