import React, { FC } from 'react';

export const Timer: FC<{ time: number }> = ({ time }) => {
    return (
        <div
            style={{
                margin: '2rem',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        padding: '0.5rem',
                        fontWeight: '700',
                        color: 'white',
                        backgroundColor: '#3480c7',
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                    }}
                >
                    Time Left
                </div>
                <div
                    style={{
                        border: '2px solid #3480c7',
                        padding: '0.5rem',
                        fontWeight: '700',
                        color: 'black',
                        backgroundColor: 'white',
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                    }}
                >
                    {time} SEC
                </div>
            </div>
        </div>
    );
};
