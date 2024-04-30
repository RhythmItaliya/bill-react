import React, { useRef, KeyboardEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import queryString from "query-string";
import LogoDark from '../../../images/logo/logo-dark.svg';
import Logo from '../../../images/logo/logo.svg';
import { LittlelLoader, SmallLoader } from '../../../common/Loader';

interface Params {
    email?: string;
    username?: string;
}

const TwoStepVerification: React.FC = () => {
    const params: Params = queryString.parse(window.location.search);
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length: 5 }, () => null));
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(30);
    const [showResendMessage, setShowResendMessage] = useState<boolean>(true);
    const [resendDisabled, setResendDisabled] = useState<boolean>(false);
    const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
    const [showRetryMessage, setShowRetryMessage] = useState<boolean>(false);
    const navigate = useNavigate();

    if (!params.email || !params.username) {
        console.error("No token or oneTimeToken provided.");
        navigate('/auth/signin');
        return null;
    }

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    clearInterval(timer);
                    setResendDisabled(false);
                    setShowResendMessage(true);
                    return 0;
                }
                setShowResendMessage(false);
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setShowRetryMessage(false);
        if (/^\d$/.test(value) && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
        const updatedCode = inputRefs.current.map(input => input?.value || '').join('');
        setVerificationCode(updatedCode);
        setAllFieldsFilled(updatedCode.length === inputRefs.current.length);
    };

    const handleBackspace = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && index > 0 && !e.currentTarget.value) {
            inputRefs.current[index - 1]?.focus();
        }
        const updatedCode = inputRefs.current.map(input => input?.value || '').join('');
        setVerificationCode(updatedCode);
        setAllFieldsFilled(updatedCode.length === inputRefs.current.length);
    };

    const handleResendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            setResendDisabled(true);

            const response = await fetch(`http://localhost:8080/userAuth/email/resend-verificationCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: params.email }),
            });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error('Failed to resend verification code');
            }
            if (responseData.success && responseData.emailSent) {
                setShowResendMessage(false);
                setCountdown(30);
            } else {
                console.error('Error sending verification email');
            }
        } catch (error) {
            console.error('Error resending verification code:', error);
            setResendDisabled(false);
        } finally {
            setLoading(false);
        }
    };

    const handleVerification = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!allFieldsFilled) return;
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/userAuth/email/two-step-verification/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: params.email, otp: verificationCode }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to verify OTP');
            }
            window.open(`${responseData.redirectQueryString}`, "_self");
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setShowRetryMessage(true);
        } finally {
            setLoading(false);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const clipboardData = e.clipboardData?.getData('text');
        if (clipboardData && clipboardData.length === inputRefs.current.length) {
            for (let i = 0; i < inputRefs.current.length; i++) {
                if (inputRefs.current[i]) {
                    (inputRefs.current[i] as HTMLInputElement).value = clipboardData[i];
                    handleInputChange(i, { target: { value: clipboardData[i] } } as React.ChangeEvent<HTMLInputElement>);
                }
            }
        }
    };

    return (
        <>
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
                                <p className="mb-7 font-medium">Enter the 5 digit code sent to the registered email id.</p>
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
                                                onPaste={handlePaste}
                                            />
                                        ))}
                                    </div>
                                    {showRetryMessage && (
                                        <p className="mt-3 block text-red-500">Verification failed. Please retry.</p>
                                    )}
                                    <p className="mb-5 mt-4 text-left font-medium text-black dark:text-white">
                                        Did not receive a code?
                                        <button
                                            className={`text-primary ml-1 ${!showResendMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={handleResendCode}
                                            disabled={resendDisabled}
                                        >
                                            {loading ? <LittlelLoader /> : "Resend"}
                                        </button>
                                    </p>

                                    <button
                                        className={`flex w-full justify-center rounded-md bg-primary p-[13px] font-bold text-gray hover:bg-opacity-90 ${!allFieldsFilled ? 'cursor-not-allowed opacity-50' : ''}`}
                                        onClick={handleVerification}
                                        disabled={!allFieldsFilled}
                                    >
                                        {loading ? <SmallLoader /> : "Verify"}
                                    </button>

                                    {countdown > 0 && (
                                        <p className="mt-2.5 text-sm text-gray-500">
                                            Resend OTP in {countdown} seconds
                                        </p>
                                    )}
                                    <span className="mt-5 block">Don’t share the verification code with anyone!</span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default TwoStepVerification;