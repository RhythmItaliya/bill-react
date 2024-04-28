import React, { useRef, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../../images/logo/logo-dark.svg';
import Logo from '../../../images/logo/logo.svg';

const TwoStepVerification: React.FC = () => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length: 5 }, () => null));

    const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (/^\d$/.test(value) && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && index > 0 && !e.currentTarget.value) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center overflow-hidden dark:bg-black">
            <div className="no-scrollbar overflow-y-auto py-20">
                <div className="mx-auto w-full max-w-[480px]">
                    <div className="text-center">
                        <Link to="/" className="mx-auto mb-10 inline-flex">
                            <img src={LogoDark} alt="logo" className="dark:hidden" />
                            <img src={Logo} alt="logo" className="hidden dark:block" />
                        </Link>
                        <div className="rounded-xl bg-white p-4 shadow-14 dark:bg-boxdark lg:p-7.5 xl:p-12.5">
                            <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-black dark:text-white">Verify Your Account</h1>
                            <p className="mb-7.5 font-medium">Enter the 4 digit code sent to the registered email id.</p>
                            <form>
                                <div className="flex items-center gap-4.5">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-3 text-center text-2xl font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            maxLength={1}
                                            onChange={(e) => handleInputChange(index, e)}
                                            onKeyDown={(e) => handleBackspace(index, e)}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode < 48 || charCode > 57) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                                <p className="mb-5 mt-4 text-left font-medium text-black dark:text-white">
                                    Did not receive a code?
                                    <button className="text-primary ml-1">Resend</button>
                                </p>
                                <button className="flex w-full justify-center rounded-md bg-primary p-[13px] font-bold text-gray hover:bg-opacity-90">Verify</button>
                                <span className="mt-5 block text-red-400">Don’t share the verification code with anyone!</span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TwoStepVerification;