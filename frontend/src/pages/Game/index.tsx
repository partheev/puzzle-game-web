import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import {
    Container,
    Grid,
    Card,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import Header from '../../components/layout/Header';
import AnswerInputField from './AnswerInputField';
import { GameLevelStepper } from '../../components/GameLevelStepper';
import { Puzzle } from './Puzzle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { gameStart, nextLevel } from '../../store/slices/gameSlice';
import { Timer } from './Timer';
import { useTimer } from '../../hooks/timer';
import { puzzleData } from '../../data/puzzleData';
import { Hints } from './Hints';
import { useNavigate } from 'react-router-dom';
import { GameInstructions } from '../../components/Popups/GameInstructions';
import { useSnackbar } from 'notistack';
export const Game = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { currentLevelIndex, currentImagesOrder, isGameOver, isGameLoading } =
        useAppSelector((state) => state.game);

    const { enqueueSnackbar } = useSnackbar();
    const { timeleft, settime } = useTimer(
        puzzleData[currentLevelIndex].timeLimit
    );

    const [showInstructions, setshowInstructions] = useState(false);

    useEffect(() => {
        if (timeleft <= 0) {
            dispatch(nextLevel({ failed: true }));
            enqueueSnackbar('Time up', {
                variant: 'warning',
            });
        }
    }, [timeleft]);

    useEffect(() => {
        settime(puzzleData[currentLevelIndex].timeLimit);
    }, [currentLevelIndex]);

    useEffect(() => {
        dispatch(gameStart());
    }, []);

    useEffect(() => {
        if (isGameOver) {
            navigate('/result');
        }
    }, [isGameOver]);

    return (
        <>
            <Header />
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isGameLoading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
            {showInstructions && (
                <GameInstructions
                    handleClose={() => {
                        setshowInstructions(false);
                    }}
                />
            )}
            <div
                style={{
                    paddingTop: '1rem',
                    backgroundColor: '#ebebeb',
                    paddingBottom: '4rem',
                }}
            >
                <Container maxWidth='lg'>
                    <div
                        style={{
                            marginBottom: '1rem',
                            display: 'flex',
                            justifyContent: 'start',
                        }}
                    >
                        <Card
                            onClick={() => setshowInstructions(true)}
                            sx={{
                                cursor: 'pointer',
                                padding: '0.5rem',
                                display: 'flex',
                                columnGap: '0.81rem',
                                alignItems: 'center',
                            }}
                        >
                            <InfoIcon color='primary' />
                            <h4 style={{ margin: '0' }}>Check instructions</h4>
                        </Card>
                    </div>
                    <GameLevelStepper activeStep={currentLevelIndex} />
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
