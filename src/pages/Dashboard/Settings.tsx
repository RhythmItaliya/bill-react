import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Avatar from '../../subComponets/Settings/Avatar';
import EmailUsername from '../../subComponets/Settings/EmailUsername';
import NameNumber from '../../subComponets/Settings/NameNumber';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../redux/store';
import PasswordChange from '../../subComponets/Settings/PasswordChange';

const Settings: React.FC = () => {
  const token = useSelector((state: RootStateType) => state.auth.token);
  const userData = useSelector((state: RootStateType) => state.auth.userData);
  const [data, setData] = useState(userData);
  console.log(data);

  useEffect(() => {
    setData(userData);
  }, [token, userData]);

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
                <form action='#'>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <NameNumber data={data} />
                  </div>

                  <div className="mb-5.5">
                    <EmailUsername data={data} />
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
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

      </div>
    </DefaultLayout>
  );
};

export default Settings;