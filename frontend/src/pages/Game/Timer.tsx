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
                        backgroundColor: 'skyblue',
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                    }}
                >
                    Time Left
                </div>
                <div
                    style={{
                        border: '2px solid skyblue',
                        padding: '0.5rem',
                        fontWeight: '700',
                        color: 'black',
                        backgroundColor: 'white',
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                    }}
                >
                    {time}
                </div>
            </div>
        </div>
    );
};
