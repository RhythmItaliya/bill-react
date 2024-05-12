import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const ECommerce: React.FC = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />

      <div>
        <h1>home</h1>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
