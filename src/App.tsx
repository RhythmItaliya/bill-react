import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './auth/useAuth';
import { useCookies } from 'react-cookie';
import { Loader } from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/AuthPage/SignIn';
import SignUp from './pages/Authentication/AuthPage/SignUp';
import Calendar from './pages/Dashboard/Calendar';
import Chart from './pages/Dashboard/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Dashboard/Profile';
import Settings from './pages/Dashboard/Settings';
import Tables from './pages/Dashboard/Tables';
import DashboardAuth from './pages/DashboardAuth';
import TwoStepVerification from './pages/Authentication/AuthPage/TwoStepVerification';
import Maintenance from './pages/Authentication/AuthPage/Maintenance';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  const [cookies] = useCookies(['_Xtoken']);
  const isAuthenticatedCookies: boolean = !!cookies['_Xtoken'];
  const isAuthenticated: boolean = isAuthenticatedCookies;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>

        <Route
          path="*"
          element={<Navigate to="/auth/signin" replace />}
        />

        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/ecommerce" replace /> : (
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            )
          }
        />

        <Route
          index
          path="/auth"
          element={
            <>
              <PageTitle title="Auth | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <DashboardAuth />
            </>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />

        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />

        <Route
          path="/auth/two-step-verification"
          element={
            <>
              <PageTitle title="2 Step Verification | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TwoStepVerification />
            </>
          }
        />

        <Route
          path="/auth/under-maintenance"
          element={
            <>
              <PageTitle title="Under Maintenance | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Maintenance />
            </>
          }
        />

        <Route
          path="/chart"
          element={
            <>
              <ProtectedRoute condition={isAuthenticated}>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/ecommerce"
          element={
            <>
              <ProtectedRoute condition={isAuthenticated}>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/calendar"
          element={
            <>
              <ProtectedRoute condition={isAuthenticated}>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <ProtectedRoute condition={isAuthenticated}>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <ProtectedRoute condition={isAuthenticated}>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <ProtectedRoute condition={isAuthenticated}>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <ProtectedRoute condition={isAuthenticated}>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <ProtectedRoute condition={isAuthenticated}>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <ProtectedRoute condition={isAuthenticated}>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </ProtectedRoute>
            </>
          }
        />

      </Routes>
    </>
  );
}

export default App;