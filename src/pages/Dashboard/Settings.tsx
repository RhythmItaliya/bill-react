import React, { useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Avatar from '../../subComponets/Settings/Avatar';
import EmailUsername from '../../subComponets/Settings/EmailUsername';
import NameNumber from '../../subComponets/Settings/NameNumber';


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`/yourEndpoint?uuid=${uuid}`);
//       const data = await response.json();

//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   if (uuid) {
//     fetchData();
//   }
// }, [uuid]);

const Settings: React.FC = () => {
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
                <form action="#">

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <NameNumber />
                  </div>

                  <div className="mb-5.5">
                    <EmailUsername />
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
            <Avatar />
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;