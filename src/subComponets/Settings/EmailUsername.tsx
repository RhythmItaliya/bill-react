import React, { useState } from 'react';
import verified from '../../images/svg/verified-symbol-icon.svg';

interface Props {
    data?: { email?: string; username?: string; setUsername?: boolean; email_verified?: boolean; };
    onDataChange?: (newData: { email?: string; username?: string; email_verified?: boolean }) => void;
    error?: string | null;
}

const EmailUsername: React.FC<Props> = ({ data = {}, onDataChange, error }) => {

    const [newEmailValue, setNewEmailValue] = useState<string>(data.email || '');
    const [prevEmailValue, setPrevEmailValue] = useState<string>(data.email || '');
    const [newUsernameValue, setNewUsernameValue] = useState<string>(data.username || '');
    const [emailError, setEmailError] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setNewEmailValue(newEmail);
        if (!validateEmail(newEmail)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
            if (onDataChange) {
                onDataChange({ email: newEmail, email_verified: false });
            }
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setNewUsernameValue(newUsername);
        if (!validateUsername(newUsername)) {
            setUsernameError('Username must be at least 3 characters long.');
        } else {
            setUsernameError('');
            if (onDataChange) {
                onDataChange({ username: newUsername });
            }
        }
    };

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateUsername = (username: string): boolean => {
        return username.length >= 3;
    };

    return (
        <>
            <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="emailAddress"
            >
                Email Address
            </label>
            <div className="relative">
                <span className="absolute left-4.5 top-4">
                    <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.8">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                fill=""
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                fill=""
                            />
                        </g>
                    </svg>
                </span>

                <input
                    className={`w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${emailError && 'border-red-500'}`}
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    autoComplete='off'
                    placeholder={data.email || ''}
                    defaultValue={data.email || ''}
                    onChange={handleEmailChange}
                />
                {emailError && (
                    <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}

                {!data.email_verified && (
                    <button
                        className="absolute right-3.5 top-2.5 bg-blue-500 text-white px-3 py-1 rounded-md"
                        onClick={() => console.log("Verify Email")}
                    >
                        Verify
                    </button>
                )}
                {data.email_verified && (
                    <img
                        src={verified}
                        alt="Verified"
                        className="absolute right-3.5 top-3.5 cursor-default"
                        width={20}
                        height={20}
                    />
                )}
            </div>

            <div className="mt-3">
                <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="username"
                >
                    Username
                </label>
                <input
                    className={`w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${usernameError && 'border-red-500'}`}
                    type="text"
                    name="username"
                    id="username"
                    autoComplete='off'
                    placeholder={data.username || "Enter your username"}
                    value={newUsernameValue}
                    onChange={handleUsernameChange}
                />

                {usernameError && (
                    <p className="text-sm text-red-500 mt-1">{usernameError}</p>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
        </>
    );
};

export default EmailUsername;