import React, { useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import Header from '../../components/layout/Header';
import AnswerInputField from './AnswerInputField';
import { GameLevelStepper } from '../../components/GameLevelStepper';
import { Puzzle } from './Puzzle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { nextLevel } from '../../store/slices/gameSlice';
import { Timer } from './Timer';
import { useTimer } from '../../hooks/timer';
import { puzzleData } from '../../data/puzzleData';
import { Hints } from './Hints';
export const Game = () => {
    const dispatch = useAppDispatch();
    const currentLevel = useAppSelector(
        (state) => state.game.currentLevelIndex
    );
    const currentImagesOrder = useAppSelector(
        (state) => state.game.currentImagesOrder
    );

    const { timeleft, settime } = useTimer(puzzleData[currentLevel].timeLimit);

    useEffect(() => {
        if (timeleft === 0) {
            dispatch(nextLevel({ failed: true }));
        }
    }, [timeleft]);

    useEffect(() => {
        settime(puzzleData[currentLevel].timeLimit);
    }, [currentLevel]);

    return (
        <>
            <Header />
            <div
                style={{
                    paddingTop: '4rem',
                    backgroundColor: '#ebebeb',
                    paddingBottom: '4rem',
                }}
            >
                <Container maxWidth='lg'>
                    <GameLevelStepper activeStep={currentLevel} />
                    <Timer time={timeleft} />
                    <AnswerInputField />
                    <Grid container>
                        <Grid
                            sx={{ display: 'flex', justifyContent: 'center' }}
                            md={8}
                            sm={12}
                            item
                        >
                            <Puzzle pictureIds={currentImagesOrder} />
                        </Grid>
                        <Grid md={4} sm={12} item>
                            <Hints />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
};
