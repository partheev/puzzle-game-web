import React, { FC } from 'react';

export const PlayGame: FC<{ startGameHandler: () => void }> = ({
    startGameHandler,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '10rem',
                width: '100%',
                borderRadius: '20px',
                alignItems: 'center',
                backgroundColor: '#8BC6EC',
                backgroundImage:
                    'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
            }}
        >
            <h1 style={{ textAlign: 'center' }}>Are you ready?</h1>
            <button
                onClick={startGameHandler}
                style={{
                    padding: '0.5rem 1rem',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    border: 'none',
                }}
            >
                Start Game
            </button>
        </div>
    );
};
