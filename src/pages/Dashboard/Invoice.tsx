import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { DownloadButton, PrintButton, SaveAsPDFButton } from '../../subComponets/Invoice/InvoiceButton';

const Invoice: React.FC = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Invoice" />
      <div className="my-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

        {/* button */}
        <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
          <div className="flex flex-wrap items-center justify-end gap-3.5">
            <PrintButton text="Print" onClick={() => console.log('Print button clicked')} />
            <SaveAsPDFButton text="Save As PDF" onClick={() => console.log('Save as PDF button clicked')} />
          </div>
        </div>

        <div className="p-5 sm:p-1 md:p-3 lg:p-5 sm:m-1 md:m-3 lg:m-5 sm:rounded-none md:rounded-lg lg:rounded-lg border border-stroke dark:border-strokedark">
          <div className="rounded-lg border border-stroke dark:border-strokedark">
            {/* 1 part */}
            <div className='p-4'>
              <div className='flex justify-between mb-2'>
                <span className='font-medium text-black dark:text-white underline uppercase tracking-wide text-sm md:text-md lg:text-xl'>TAX INVOICE</span>
                <span className='font-medium text-black dark:text-white uppercase tracking-wide text-sm md:text-xl lg:text-xl'>શ્રી ગણેશાય નમઃ</span>
                <div className='flex flex-col justify-between'>
                  <span className='font-medium text-black dark:text-white tracking-wide text-sm md:text-md lg:text-xl'>Maheshbhai</span>
                  <span>
                    <span className='font-medium text-black dark:text-white'>Mo. </span>9879036837
                  </span>
                </div>
              </div>

              {/* 2 part */}
              <div className="uppercase text-black dark:text-white mb-4">
                <span className="font-bold text-4xl md:text-5xl lg:text-6xl">Keyur</span>
                <span className="mx-1"></span>
                <span className="font-bold tracking-wider text-2xl md:text-3xl lg:text-4xl">Fashion</span>
              </div>

              {/* 3 part */}
              <div className='flex items-center justify-between'>
                <p className='text-sm md:text-md lg:text-xl text-black dark:text-white tracking-wide'>All Types Of Computerized Embroidery Job Work</p>
                <span className='uppercase'>
                  <span className="font-medium text-black dark:text-white">GSTIN : </span>24ANFPL8881NZA
                </span>
              </div>
            </div>

            {/* 4 part */}
            <div className='border-t border-stroke dark:border-strokedark flex justify-center items-start p-2'>
              <span className="text-md lg:text-xl text-black dark:text-white tracking-wide uppercase">167, Trupati ind., Opp Akhand Anad College,Ved Road Surat.</span>
            </div>
          </div>

          {/* 5 part */}
          <div className="flex flex-col sm:flex-row justify-around my-3 gap-3">
            <div className="rounded-lg border border-stroke dark:border-strokedark mb-4 sm:mb-0 flex justify-start px-3 items-center flex-1 p-2">
              <table>
                <tr>
                  <td className="px-4 font-bold text-black dark:text-white">M/s. :</td>
                  <td className="px-4 last:border-r-0 dark:border-strokedark sm:border-b-0 text-sm font-medium">Rhythm Itialiya</td>
                </tr>
                <tr>
                  <td className="px-4 font-bold text-black dark:text-white">GSTIN :</td>
                  <td className="px-4 last:border-r-0 dark:border-strokedark sm:border-b-0 text-sm font-medium">24ANFPL8881NZA</td>
                </tr>
              </table>
            </div>

            <div className="rounded-lg border border-stroke dark:border-strokedark flex justify-start px-3 items-center flex-1 sm:flex-2 p-2">
              <table>
                <tr>
                  <td className="px-4 font-bold text-black dark:text-white">Bill No :</td>
                  <td className="px-4 last:border-r-0 dark:border-strokedark sm:border-b-0 text-sm font-medium">#1012</td>
                </tr>
                <tr>
                  <td className="px-4 font-bold text-black dark:text-white">Date :</td>
                  <td className="px-4 last:border-r-0 dark:border-strokedark sm:border-b-0 text-sm font-medium">02/04/2024</td>
                </tr>
                <tr>
                  <td className="px-4 font-bold text-black dark:text-white">Ch. No. :</td>
                  <td className="px-4 last:border-r-0 dark:border-strokedark sm:border-b-0 text-sm font-medium">202</td>
                </tr>
              </table>
            </div>
          </div>

          {/* 6 part */}
          <div className="rounded-lg my-3">
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[670px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <th className="py-3 pl-5 pr-6 col-span-3 border border-stroke dark:border-strokedark">
                        <h5 className="font-bold text-black dark:text-white">No.</h5>
                      </th>
                      <th className="py-3 pl-5 pr-6 col-span-4 border border-stroke dark:border-strokedark min-w-[300px]">
                        <h5 className="font-bold text-black dark:text-white">Particulars</h5>
                      </th>
                      <th className="py-3 pl-5 pr-6 col-span-2 border border-stroke dark:border-strokedark min-w-[100px]">
                        <h5 className="font-bold text-black dark:text-white">Quantity</h5>
                      </th>
                      <th className="py-3 pl-5 pr-6 col-span-2 border border-stroke dark:border-strokedark min-w-[100px]">
                        <h5 className="font-bold text-black dark:text-white">Rate</h5>
                      </th>
                      <th className="py-3 pl-5 pr-6 col-span-1 border border-stroke dark:border-strokedark min-w-[100px]">
                        <h5 className="text-right font-bold text-black dark:text-white">Amount</h5>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="py-3 pl-5 pr-6 col-span-3 border-l border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">1</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-4 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium">Varun</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-2 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">12</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-2 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">2</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-1 border-r border-stroke dark:border-strokedark">
                        <p className="text-right font-medium">$200</p>
                      </td>
                    </tr>

                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="py-3 pl-5 pr-6 col-span-3 border-l border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">2</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-4 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium">Rhythm</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-2 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">2</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-2 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">3</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-1 border-r border-stroke dark:border-strokedark">
                        <p className="text-right font-medium">$200</p>
                      </td>
                    </tr>

                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="py-3 pl-5 pr-6 col-span-3 border-l border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">3</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-4 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium">Ruto</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-2 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">2</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-2 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">3</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-1 border-r border-stroke dark:border-strokedark">
                        <p className="text-right font-medium">$400</p>
                      </td>
                    </tr>


                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="py-3 pl-5 pr-6 col-span-3 border-l border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">3</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-4 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium">PP</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-2 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">2</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-2 border-r border-stroke dark:border-strokedark">
                        <p className="font-medium text-center">3</p>
                      </td>
                      <td className="py-3 pl-5 pr-6 col-span-1 border-r border-stroke dark:border-strokedark">
                        <p className="text-right font-medium">$400</p>
                      </td>
                    </tr>

                    <tr>
                      <th colSpan={2} className="py-1 col-span-4 border-l border-stroke dark:border-strokedark"></th>
                      <td colSpan={2} className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='flex justify-between items-center border-b border-stroke dark:border-strokedark pl-5 pr-6'>
                          <p className="font-bold text-black dark:text-white text uppercase">Total</p>
                        </div>
                      </td>
                      <td className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='border-b border-stroke dark:border-strokedark px-5'>
                          <p className="font-medium text-right">200rs</p>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th colSpan={2} className="py-1 col-span-4 border-l border-stroke dark:border-strokedark"></th>
                      <td colSpan={2} className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='flex justify-between items-center border-b border-stroke dark:border-strokedark pl-5 pr-6'>
                          <p className="font-bold text-black dark:text-white text">TDS</p>
                          <p className="font-medium text">20%</p>
                        </div>
                      </td>
                      <td className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='border-b border-stroke dark:border-strokedark px-5'>
                          <p className="font-medium text-right">200rs</p>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th colSpan={2} className="py-1 col-span-4 border-l border-stroke dark:border-strokedark"></th>
                      <td colSpan={2} className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='flex justify-between items-center border-b border-stroke dark:border-strokedark pl-5 pr-6'>
                          <p className="font-bold text-black dark:text-white text">Less Discount</p>
                          <p className="font-medium text">20%</p>
                        </div>
                      </td>
                      <td className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='border-b border-stroke dark:border-strokedark px-5'>
                          <p className="font-medium text-right">200rs</p>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th colSpan={2} className="py-1 col-span-4 border-l border-stroke dark:border-strokedark"></th>
                      <td colSpan={2} className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='flex justify-between items-center border-b border-stroke dark:border-strokedark pl-5 pr-6'>
                          <p className="font-bold text-black dark:text-white text">Total Amount Before Tax</p>
                        </div>
                      </td>
                      <td className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='border-b border-stroke dark:border-strokedark px-5'>
                          <p className="font-medium text-right">200rs</p>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th colSpan={2} className="py-1 col-span-4 border-l border-stroke dark:border-strokedark"></th>
                      <td colSpan={2} className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='flex justify-between items-center border-b border-stroke dark:border-strokedark pl-5 pr-6'>
                          <p className="font-bold text-black dark:text-white text">Add. CGST</p>
                          <p className="font-medium text">20%</p>
                        </div>
                      </td>
                      <td className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='border-b border-stroke dark:border-strokedark px-5'>
                          <p className="font-medium text-right">200rs</p>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th colSpan={2} className="py-1 col-span-4 border-l border-stroke dark:border-strokedark"></th>
                      <td colSpan={2} className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='flex justify-between items-center border-b border-stroke dark:border-strokedark pl-5 pr-6'>
                          <p className="font-bold text-black dark:text-white text">Add. SGST</p>
                          <p className="font-medium text">20%</p>
                        </div>
                      </td>
                      <td className="py-1 col-span-2 border-l border-r border-stroke dark:border-strokedark">
                        <div className='border-b border-stroke dark:border-strokedark px-5'>
                          <p className="font-medium text-right">200rs</p>
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-stroke dark:border-strokedark">
                      <th colSpan={2} className="py-1 pl-5 pr-6 col-span-4 border-l border-b border-stroke dark:border-strokedark"></th>
                      <td colSpan={2} className="py-1 text-center font-bold border-l border-r border-stroke dark:border-strokedark text-black dark:text-white uppercase">Total Amount</td>
                      <td className="py-1 pl-5 pr-6 col-span-2 border-r border-stroke dark:border-strokedark">
                        <p className="font-bold text-end text-black dark:text-white">$200</p>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 7 part */}
          <div className="rounded-lg border border-stroke dark:border-strokedark flex flex-col sm:flex-row my-3 gap-3 p-4">
            <div className="sm:mb-0 flex-col justify-start px-3 items-center flex-1 p-2">
              <h4 className="font-bold text-lg mb-2">Terms and Conditions:</h4>
              <p className="text-sm">
                1)&nbsp;Any Complaints for goos should be be made within 7 days after that no complaint with be entered.
              </p>
              <p className="text-sm">
                2)&nbsp;Interest @ 30% per annum will be charged after due of the bill.
              </p>
              <p className="text-sm">
                3)&nbsp;Dispute will be settled in surat Court only.
              </p>
              <p className="text-sm">
                4)&nbsp;Personally select goods will not be taken back.
              </p>

              <div className='mt-5.5'>
                <span className="md:text-md lg:text-lg italic font-bold text-black dark:text-white">Receiver Sign </span>
                <span className="md:text-md lg:text-lg">...............</span>
              </div>
            </div>

            <div className="flex justify-end px-3 flex-1 sm:flex-2 mt-5">
              <span className="text-2xl italic font-semibold text-black dark:text-white">For, Keyur Fashion</span>
            </div>
          </div>

          <DownloadButton text='Download' onClick={() => console.log('Dowload button clicked')} />
        </div>
      </div>
    </DefaultLayout >
  );
};

export default Invoice;
