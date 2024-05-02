import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const [authCookie] = useCookies(['_Xtoken']);
  const [tokenCookie] = useCookies(['_Xauth']);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies, , removeCookies] = useCookies(['_Xtoken']);
  const [cookies2, , removeCookies2] = useCookies(['_Xauth']);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);
  const isAuthenticated = !!authCookie['_Xtoken'] && !!tokenCookie['_Xauth'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isAuthenticated && !verificationSent) {
      verifyUser(authCookie['_Xtoken'], tokenCookie['_Xauth']);
      setVerificationSent(true);
    }
  }, [isAuthenticated, authCookie, tokenCookie, verificationSent]);

  const verifyUser = async (authCookie: string | undefined, tokenCookie: string | undefined): Promise<void> => {
    try {
      setLoading(true);
      if (!authCookie || !tokenCookie) {
        throw new Error('Cookies are missing');
      }

      const response = await fetch(`http://localhost:8080/userAuth/email/firewall`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: tokenCookie,
          uuid: authCookie
        })
      });

      if (!response.ok) {
        removeCookies('_Xtoken', { path: '/' });
        removeCookies2('_Xauth', { path: '/' });
        localStorage.clear();
        sessionStorage.clear();
        navigate('/auth/signin');
        return;
      }

    } catch (error) {
      console.error('Error verifying user:', error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>

        {/* Redirect all paths to signin if not authenticated */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* Public routes */}
        <Route path="/"
          element={
            isAuthenticated ? <Navigate to="/ecommerce" replace /> : (
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            )
          }
        />

        {/* Authentication routes */}
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
            isAuthenticated ? <Navigate to="/ecommerce" replace /> : (
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            )
          }
        />

        <Route
          path="/auth/signup"
          element={
            isAuthenticated ? <Navigate to="/ecommerce" replace /> : (
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            )
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

        {/* Protected routes */}
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