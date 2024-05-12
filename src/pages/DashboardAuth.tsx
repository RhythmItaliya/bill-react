import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import DefaultLayout from '../layout/DefaultLayout';
import { Loader } from '../common/Loader';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from '../redux/actions';

interface Params {
  token?: string;
  name?: string;
  email?: string;
  picture?: string;
  sessionName?: string;
  sessionExpire?: string;
  oneTimeToken?: string;
  token2?: string;
}

const DashboardAuth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const queryParams: Params = queryString.parse(window.location.search) as Params;
        validateQueryParams(queryParams);

        await verifyToken(queryParams.oneTimeToken!, queryParams.token!);

        setSessionAndCookies(queryParams);

        const userData = await fetchUserData(queryParams.token!);

        dispatch(setToken(queryParams.token!));
        dispatch(setUserData(userData.responseData));
        navigate('/home');
      } catch (error: any) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const validateQueryParams = (queryParams: Params): void => {
    if (!queryParams.token || !queryParams.oneTimeToken || !queryParams.token2) {
      throw new Error('No token or oneTimeToken provided.');
    }
  };

  const verifyToken = async (oneTimeToken: string, token: string): Promise<void> => {
    const response = await fetch(`http://localhost:8080/userAuth/email/verify`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: oneTimeToken,
        uuid: token
      })
    });

    if (!response.ok) {
      throw new Error('An error occurred while processing your request');
    }

    const responseData = await response.json();
    if (!responseData.success) {
      throw new Error('Error verifying token');
    }
  };

  const setSessionAndCookies = (queryParams: Params): void => {
    const cookies = new Cookies();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    cookies.set('_Xtoken', queryParams.token, {
      secure: true,
      sameSite: 'strict',
      expires: expirationDate
    });

    cookies.set('_Xauth', queryParams.token2, {
      secure: true,
      sameSite: 'strict',
      expires: expirationDate
    });

    if (queryParams.sessionName && queryParams.sessionExpire) {
      sessionStorage.setItem('_Xname', queryParams.sessionName);
      sessionStorage.setItem('_Xexpire', queryParams.sessionExpire);
    }
  };

  const fetchUserData = async (token: string): Promise<any> => {
    const dataResponse = await fetch(`http://localhost:8080/profile/users`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    });

    if (!dataResponse.ok) {
      throw new Error('An error occurred while fetching user data');
    }

    const userData = await dataResponse.json();
    if (!userData.success) {
      throw new Error('Error fetching user data');
    }

    return userData;
  };

  const handleError = (error: any): void => {
    console.error('An error occurred:', error);
    setError(error.message || 'An error occurred while processing your request');
    navigate('/auth/signin');
  };

  return (
    <DefaultLayout>
      {isLoading && <Loader />}
      {error && <div>Error: {error}</div>}
    </DefaultLayout>
  );
};

export default DashboardAuth;