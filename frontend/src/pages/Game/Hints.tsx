import React from 'react';
import { Alert } from '@mui/material';
import { puzzleHints } from '../../data/puzzleHints';
import { useAppSelector } from '../../hooks/redux';
export const Hints = () => {
    const currentLevelIndex = useAppSelector(
        (state) => state.game.currentLevelIndex
    );
    const hintsUsed = useAppSelector((state) => state.game.hintsUsed);
    const hints = puzzleHints[currentLevelIndex];

    const handleUnlockHint = () => {};
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Hints</h2>
            <Alert severity='info'>
                Unlocking each hint reduces your points
            </Alert>
        </div>
    );
};
