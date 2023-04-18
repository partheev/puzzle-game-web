import React, { useState } from 'react';
import brainImage from '../../assets/brain-image.png';
import { Button } from '@mui/material';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';

enum Screens {
    Login,
    Registraion,
}
export const Auth = () => {
    const [currentScreen, setcurrentScreen] = useState<Screens>(Screens.Login);

    const goToRegistration = () => {
        setcurrentScreen(Screens.Registraion);
    };
    const goToLogin = () => {
        setcurrentScreen(Screens.Login);
    };
    return (
        <>
            <img
                style={{
                    width: '100%',
                    zIndex: -1,
                    position: 'absolute',
                    objectFit: 'cover',
                    height: '100%',
                    objectPosition: 'right center',
                    filter: 'blur(5px) brightness(80%)',
                }}
                src={brainImage}
            />
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {currentScreen === Screens.Login ? (
                    <LoginForm goToRegistration={goToRegistration} />
                ) : (
                    <RegistrationForm goToLogin={goToLogin} />
                )}
            </div>
        </>
    );
};
