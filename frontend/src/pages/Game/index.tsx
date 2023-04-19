import React, { useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import Header from '../../components/layout/Header';
import AnswerInputField from './AnswerInputField';
import { GameLevelStepper } from '../../components/GameLevelStepper';
import { Puzzle } from './Puzzle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {} from '../../store/slices/gameSlice';
import { Timer } from './Timer';
import { useTimer } from '../../hooks/timer';
import { puzzleData } from '../../data/puzzleData';
export const Game = () => {
    const dispatch = useAppDispatch();
    const currentLevel = useAppSelector(
        (state) => state.game.currentLevelIndex
    );
    const { timeleft, settime } = useTimer(puzzleData[currentLevel].timeLimit);

    return (
        <>
            <Header />
            <div style={{ paddingTop: '4rem', marginBottom: '4rem' }}>
                <Container maxWidth='lg'>
                    <GameLevelStepper activeStep={currentLevel} />
                    <Timer time={timeleft} />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <AnswerInputField />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'end',
                            }}
                        >
                            <Button variant='contained'>Submit Word</Button>
                            <h5 style={{ color: 'gray' }}>Attempts left: 5</h5>
                        </div>
                    </div>
                    <Grid container>
                        <Grid
                            sx={{ display: 'flex', justifyContent: 'center' }}
                            md={8}
                            sm={12}
                            item
                        >
                            <Puzzle />
                        </Grid>
                        <Grid md={4} sm={12} item></Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
};
// export default Game
