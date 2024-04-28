import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmallLoader } from '../../../common/Loader';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useGoogleAuth = (context: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const keysResponse = await fetch('http://127.0.0.1:8080/getkeys');
                const keysData = await keysResponse.json();
                console.log('Keys data:', keysData);
            } catch (error: any) {
                setError(error.message || 'An error occurred while fetching keys');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const decodeResponse = async (credential: any) => {
        try {
            const url = new URL('http://127.0.0.1:8080/oauth');
            url.searchParams.append('code', credential);
            const localReq = await fetch(url);
            const data = await localReq.json();
            return data;
        } catch (error) {
            console.error('Error decoding response:', error);
            throw new Error('An error occurred while decoding response');
        }
    };

    (window as any).handleAuth = async (response: any) => {
        try {
            setLoading(true);
            const responsePayload = await decodeResponse(response.credential);

            if (responsePayload) {
                const expiration = new Date();
                expiration.setTime(expiration.getTime() + (1 * 60 * 60 * 1000)); // 1 hour
                cookies.set('_xToken', responsePayload.token, { path: '/', secure: true, httpOnly: true, sameSite: 'strict', expires: expiration });

                sessionStorage.setItem('sessionId', responsePayload.sessionId);
     
                const sessionExpiration = new Date();
                sessionExpiration.setTime(sessionExpiration.getTime() + (1 * 60 * 60 * 1000)); // 1 hour
                sessionStorage.setItem('sessionExpiration', sessionExpiration.toISOString());

                navigate('/');
            } else {
                navigate(`/auth/${context}`);
            }
        } catch (error: any) {
            console.error('Error handling authentication:', error);
            setError(error.message || 'An error occurred while handling authentication');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return { loading, error };
};

const SignInGoogle: React.FC = () => {
    const { loading, error } = useGoogleAuth('signin');

    return (
        <div className='flex justify-center'>
            <div id="g_id_onload"
                data-client_id="733671835830-d4vf7h3s0u9ilqakou3rh4pi2hee8unl.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleAuth"
                data-auto_prompt="false">
            </div>

            <div className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
            </div>

            {loading && <SmallLoader />}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

const SignUpGoogle: React.FC = () => {
    const { loading, error } = useGoogleAuth('signup');

    return (
        <div className='flex justify-center'>
            <div id="g_id_onload"
                data-client_id="733671835830-d4vf7h3s0u9ilqakou3rh4pi2hee8unl.apps.googleusercontent.com"
                data-context="signup"
                data-ux_mode="popup"
                data-callback="handleAuth"
                data-auto_prompt="false">
            </div>

            <div className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signup_with"
                data-size="large"
                data-logo_alignment="left">
            </div>

            {loading && <SmallLoader />}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export { SignInGoogle, SignUpGoogle };
