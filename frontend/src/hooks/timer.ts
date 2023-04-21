import React, { useState, useEffect } from 'react';

export const useTimer = (timeleft: number) => {
    const [time, settime] = useState(timeleft);

    useEffect(() => {
        const id = setInterval(() => {
            settime((t) => {
                if (t === 0) {
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return { timeleft: time, settime };
};
