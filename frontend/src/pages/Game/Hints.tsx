import React from 'react';
import { Alert, Card, Typography, CardContent } from '@mui/material';
import { puzzleHints } from '../../data/puzzleHints';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { unlockHint } from '../../store/slices/gameSlice';
export const Hints = () => {
    const dispatch = useAppDispatch();
    const currentLevelIndex = useAppSelector(
        (state) => state.game.currentLevelIndex
    );
    const hintsUsed = useAppSelector((state) => state.game.hintsUsed);
    const hints = puzzleHints[currentLevelIndex];

    const handleUnlockHint = (index: number) => {
        if (hintsUsed === index) {
            dispatch(unlockHint());
        }
    };
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Hints</h2>
            <Alert severity='info' sx={{ marginBottom: '0.5rem' }}>
                You can only unlock hints in order{' '}
            </Alert>
            <Alert severity='warning'>
                Unlocking each hint reduces 10% of your level points
            </Alert>
            {hints &&
                hints.map((hint, index) => {
                    return (
                        <Card
                            key={index}
                            onClick={() => handleUnlockHint(index)}
                            sx={{
                                cursor:
                                    hintsUsed === index ? 'pointer' : 'default',
                                padding: '0.5rem',
                                marginY: '0.5rem',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography>#{index + 1} Hint</Typography>
                                {hintsUsed > index ? (
                                    <LockOpenIcon color='primary' />
                                ) : (
                                    <LockIcon color='disabled' />
                                )}
                            </div>
                            {hintsUsed > index && (
                                <CardContent>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: `<span>${hint}</span>`,
                                        }}
                                    ></div>
                                </CardContent>
                            )}
                        </Card>
                    );
                })}
        </div>
    );
};
