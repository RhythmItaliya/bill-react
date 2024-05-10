import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Avatar from '../../subComponets/Settings/Avatar';
import EmailUsername from '../../subComponets/Settings/EmailUsername';
import NameNumber from '../../subComponets/Settings/NameNumber';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../redux/store';
import PasswordChange from '../../subComponets/Settings/PasswordChange';
import SuccessAlert from '../../alert/SuccessAlert';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/actions';

const Settings: React.FC = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootStateType) => state.auth.token);
  const userData = useSelector((state: RootStateType) => state.auth.userData);
  const [data, setData] = useState(userData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setData(userData);
  }, [token, userData]);

  const handleDataChange = (newData: { email?: string; username?: string; name?: string; email_verified?: boolean }) => {
    setData((prevData: typeof userData) => {
      const mergedData = { ...prevData, ...newData };
      return mergedData;
    });
    setError(null);
  };

  const saveChanges = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/profile/update/users/${token}`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          name: data.name,
          username: data.username,
          email: data.email,
          email_verified: data.email_verified,
          picture: data.picture,
          setUsername: data.setUsername,
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        } else {
          throw new Error('Failed to save changes');
        }
      } else {
        setSuccess(true);
        const userData = await fetchUserData(token);
        dispatch(setUserData(userData.responseData));
      }
    } catch (error: any) {
      console.error('Error saving changes:', error);
      setError(error.message);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>

              <div className="p-7">
                <div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <NameNumber data={data} onDataChange={handleDataChange} />
                  </div>

                  <div className="mb-5.5">
                    <EmailUsername data={data} onDataChange={handleDataChange} error={error} />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={saveChanges}
                      disabled={loading}
                      className="w-full flex justify-center gap-3 rounded-md bg-primary px-5 py-3 text-white hover:bg-opacity-90"
                    >
                      <span className={loading ? "flex items-center" : ""}>
                        {loading && (
                          <span className="animate-spin mr-2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask id="path-1-inside-1_1881_16183" fill="white">
                                <path
                                  d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z"
                                ></path>
                              </mask>
                              <path
                                d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z"
                                stroke="white"
                                strokeWidth="14"
                                mask="url(#path-1-inside-1_1881_16183)"
                              ></path>
                            </svg>
                          </span>
                        )}
                        {loading ? "Saving..." : "Save"}
                      </span>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-2">
            <Avatar data={data} />
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white p-10 shadow-default dark:border-strokedark dark:bg-boxdark mt-4">
          <div className="flex flex-wrap justify-center">
            <PasswordChange data={data} />
          </div>
        </div>

        {success && <SuccessAlert successMessage="Changes saved successfully!" />}

      </div>
    </DefaultLayout>
  );
};

export default Settings;