import React from 'react';
// MUI
import Grid from '@mui/material/Grid';

// UI
import PageLayout from '../components/layouts/PageLayout';
import Loading from './Loading';
import UserWelcome from '../components/body/UserWelcome';
import ProductsWidget from '../components/body/ProductsWidget';
import CategoriesWidget from '../components/body/CategoriesWidget';
// REDUX
import {useSelector} from 'react-redux';

const Dashboard = () => {
  const {isLoading} = useSelector(state => state.userState);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UserWelcome />
        </Grid>

        <Grid item xs={6}>
          <ProductsWidget />
        </Grid>
        <Grid item xs={6}>
          <CategoriesWidget />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default Dashboard;
