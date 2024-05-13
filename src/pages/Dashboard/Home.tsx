import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const Home: React.FC = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />

      <div>
        <h1>Home</h1>
      </div>
    </DefaultLayout>
  );
};

export default Home;