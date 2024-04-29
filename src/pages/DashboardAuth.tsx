import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import Cookies from 'universal-cookie';
import DefaultLayout from '../layout/DefaultLayout';
import { Loader } from '../common/Loader';

interface Params {
  token?: string;
  name?: string;
  email?: string;
  picture?: string;
  sessionName?: string;
  sessionExpire?: string;
  oneTimeToken?: string;
}

const dashboardAuth: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params: Params = queryString.parse(window.location.search);
 
    if (!params.token || !params.oneTimeToken) {
      console.error("No token or oneTimeToken provided.");
      navigate('/auth/signin');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/userAuth/email/verify`, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: params.oneTimeToken,
            uuid: params.token
          })
        });

        if (response.ok) {
          const responseData = await response.json();
          setIsLoading(false);

          if (responseData.success) {
            if (params.token) {
              const cookies = new Cookies();
              const expirationDate = new Date();
              expirationDate.setDate(expirationDate.getDate() + 1);
              cookies.set('_Xtoken', params.token, {
                secure: true,
                sameSite: 'strict',
                expires: expirationDate,
                // httpOnly: true,
              });
            }

            if (params.sessionName && params.sessionExpire) {
              sessionStorage.setItem('_Xname', params.sessionName);
              sessionStorage.setItem('_Xexpire', params.sessionExpire);
            }

            navigate('/ecommerce');
          } else {
            setError('Error verifying token');
            navigate('/auth/signin');
          }
        } else {
          setError('Error verifying token');
          navigate('/auth/signin');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('An error occurred while processing your request:', error);
        setError('An error occurred while processing your request');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <DefaultLayout>
      {isLoading ? <Loader /> : null}
      {error && <div>Error: {error}</div>}
    </DefaultLayout>
  );
};

export default dashboardAuth;