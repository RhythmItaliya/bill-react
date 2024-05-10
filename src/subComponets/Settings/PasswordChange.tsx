import React, { useState } from 'react';
import ErrorAlert from '../../alert/ErrorAlert';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../redux/store';

const PasswordChange: React.FC = () => {
    const [oldPasswordValue, setOldPasswordValue] = useState<string>('');
    const [newPasswordValue, setNewPasswordValue] = useState<string>('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false);

    const [showPassword, setShowPassword] = useState(true);
    const [showOldPassword, setShowOldPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const token = useSelector((state: RootStateType) => state.auth.token);
    const [isLoading, setIsLoading] = useState(false);

    const [passwordSet, setPasswordSet] = useState<boolean>(false);

    const verifyOldPassword = async () => {
        try {
            setIsLoading(true);
            if (!oldPasswordValue) {
                setError('Old password is required');
                return;
            }

            const response = await fetch(`http://localhost:8080/profile/update/verify-old-password`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    oldPassword: oldPasswordValue,
                }),
            });
            if (!response.ok) {
                throw new Error('Old password verification failed');
            }
            setIsOldPasswordVerified(true);
            setOldPasswordValue('');
            setError('');
        } catch (error) {
            setError('Old password verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    const validatePassword = (password: string) => {
        let errorMessage = 'New Password must be: ';
        let isValid = true;

        if (password.length < 8) {
            errorMessage += '\n- at least 8 characters long';
            isValid = false;
        }

        if (!/[a-z]/.test(password)) {
            errorMessage += '\n- Contain at least one lowercase letter';
            isValid = false;
        }

        if (!/[A-Z]/.test(password)) {
            errorMessage += '\n- Contain at least one uppercase letter';
            isValid = false;
        }

        if (!/\d/.test(password)) {
            errorMessage += '\n- Contain at least one digit';
            isValid = false;
        }

        if (!/[@$!%*?&]/.test(password)) {
            errorMessage += '\n- Contain at least one symbol';
            isValid = false;
        }

        return isValid ? null : errorMessage;
    };

    const handlePasswordChange = async () => {
        try {
            setIsLoading(true);
            if (!newPasswordValue || !confirmPasswordValue) {
                setError('New password and confirm password are required');
                return;
            }

            if (newPasswordValue !== confirmPasswordValue) {
                setError('New password and confirm password must match');
                return;
            }

            const newPasswordError = validatePassword(newPasswordValue);
            if (newPasswordError) {
                setError(newPasswordError);
                return;
            }

            const response = await fetch(`http://localhost:8080/profile/update/new-password`, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    newPassword: newPasswordValue,
                }),
            });
            if (!response.ok) {
                throw new Error('Password change failed');
            }

            setOldPasswordValue('');
            setNewPasswordValue('');
            setConfirmPasswordValue('');
            setError('');
            setIsModalOpen(false);
        } catch (error) {
            setError('Password change failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setNewPasswordValue('');
        setConfirmPasswordValue('');
        setError('');
        setOldPasswordValue('');

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:8080/profile/update/password-set?token=${token}`, {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to check password set');
                }

                const data = await response.json();
                setPasswordSet(!!data.passwordSet);
                setError('');
            } catch (error) {
                setError('Failed to check password set');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    };


    const togglePasswordVisibility = (field: string) => {
        switch (field) {
            case 'old':
                setShowOldPassword(!showOldPassword);
                break;
            case 'confirm':
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    const renderPasswordVisibilityIcon = (field: string) => {
        let showPassword = false;

        switch (field) {
            case 'old':
                showPassword = showOldPassword;
                break;
            case 'confirm':
                showPassword = showConfirmPassword;
                break;
            default:
                break;
        }

        return (
            <span className="absolute right-4 top-4 cursor-pointer" onClick={() => togglePasswordVisibility(field)}>
                {showPassword ? (
                    <svg
                        className="fill-current cursor-pointer"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setShowPassword(false)}
                    >
                        <g opacity="0.5">
                            <path
                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                fill=""
                            />
                        </g>
                    </svg>
                ) : (
                    <svg
                        className="fill-current cursor-pointer"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setShowPassword(true)}
                    >
                        <g opacity="0.5">
                            <path
                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                fill=""
                            />
                            <path
                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                fill=""
                            />
                        </g>
                    </svg>
                )}
            </span>
        );
    };

    return (
        <>
            <button
                onClick={toggleModal}
                disabled={isLoading}
                className="rounded-md bg-primary px-9 py-3 font-medium text-white hover:bg-opacity-90"
                type="button"
            >
                Change Your Password
            </button>

            {isModalOpen && (
                <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
                    <div className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white px-8 py-12 dark:bg-boxdark md:py-15">
                        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">Change Password</h3>
                        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>

                        {!isOldPasswordVerified && passwordSet && (
                            <>
                                <div className="mb-4">
                                    <div className="relative">
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type={showPassword ? 'text' : 'password'}
                                            id="oldPassword"
                                            autoComplete="off"
                                            placeholder="Enter your Current Password"
                                            value={oldPasswordValue}
                                            onChange={(e) => setOldPasswordValue(e.target.value)}
                                        />
                                        {renderPasswordVisibilityIcon('old')}
                                    </div>
                                </div>
                            </>
                        )}

                        {(isOldPasswordVerified || !passwordSet) && (
                            <>
                                <div className="mb-4">
                                    <div className="relative">
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="password"
                                            id="newPassword"
                                            autoComplete="off"
                                            placeholder="Enter your new password"
                                            value={newPasswordValue}
                                            onChange={(e) => setNewPasswordValue(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="relative">
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type={showPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            autoComplete="off"
                                            placeholder="Enter your confirm password"
                                            value={confirmPasswordValue}
                                            onChange={(e) => setConfirmPasswordValue(e.target.value)}
                                        />
                                        {renderPasswordVisibilityIcon('confirm')}
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="-mx-3 mt-5 flex flex-wrap gap-y-4">
                            <div className="2xsm:w-1/2 w-full px-3">
                                <button
                                    onClick={toggleModal}
                                    className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1 select-none">Cancel</button>
                            </div>

                            {!isOldPasswordVerified && passwordSet && (

                                <div className="2xsm:w-1/2 w-full px-3">
                                    <button
                                        onClick={verifyOldPassword}
                                        disabled={isLoading}
                                        className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90 select-none">Verify Old Password</button>
                                </div>
                            )}

                            {(isOldPasswordVerified || !passwordSet) && (

                                <div className="2xsm:w-1/2 w-full px-3">
                                    <button
                                        onClick={handlePasswordChange}
                                        disabled={isLoading}
                                        className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90 select-none">Set Password</button>
                                </div>
                            )}
                        </div>
                        {error && <ErrorAlert errorMessage={error} />}
                    </div>
                </div >
            )}

        </>
    );
};

export default PasswordChange;