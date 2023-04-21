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
import {
    gameStart,
    nextLevel,
    startGameLoading,
    startGameSaving,
    stopGameLoading,
    stopGameSaving,
    updateLevelTime,
} from '../../store/slices/gameSlice';
import { Timer } from './Timer';
import { useTimer } from '../../hooks/timer';
import { puzzleData } from '../../data/puzzleData';
import { Hints } from './Hints';
import { useNavigate } from 'react-router-dom';
import { GameInstructions } from '../../components/Popups/GameInstructions';
import { useSnackbar } from 'notistack';
import { GameAPI } from '../../services/api/Game';
import { generateScore } from '../../utils/generateScore';
export const Game = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        currentLevelIndex,
        currentImagesOrder,
        isGameOver,
        isGameLoading,
        levelScore,
        hintsUsed,
        isFailed,
        isGameSaving,
        levelTimes,
    } = useAppSelector((state) => state.game);

    const { enqueueSnackbar } = useSnackbar();
    const { timeleft, settime } = useTimer(
        puzzleData[currentLevelIndex].timeLimit
    );

    const [showInstructions, setshowInstructions] = useState(false);

    const saveGame = async () => {
        try {
            dispatch(startGameSaving());
            const res = await GameAPI.updateGameProgress({
                time: timeleft,
                score: generateScore({
                    time: timeleft,
                    currentLevelIndex,
                    hintsUsed,
                }),
                level: currentLevelIndex,
            });
            dispatch(stopGameSaving());
        } catch (err) {
            console.log(err);
        }
    };
    const handleNextLevel = async ({ failed }: { failed: boolean }) => {
        try {
            dispatch(startGameLoading());
            const res = await GameAPI.updateGameProgress({
                time: timeleft,
                score: generateScore({
                    time: timeleft,
                    currentLevelIndex,
                    hintsUsed,
                }),
                level: currentLevelIndex,
            });
            dispatch(nextLevel({ failed }));
            dispatch(stopGameLoading());
        } catch (err) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
            dispatch(stopGameLoading());
        }
    };

    const handleGameOver = async ({ isPassed }: { isPassed: boolean }) => {
        try {
            dispatch(startGameLoading());
            const gameScores: { time: number; score: number }[] = [];
            for (let i = 0; i < levelScore.length; i++) {
                gameScores.push({
                    time: levelTimes[i],
                    score: levelScore[i],
                });
            }
            const res = await GameAPI.saveGameResult({
                gameScores,
                isPassed,
            });
            navigate('/result');
            dispatch(stopGameLoading());
        } catch (err) {
            dispatch(stopGameLoading());
        }
    };
    useEffect(() => {
        dispatch(
            updateLevelTime({
                time: puzzleData[currentLevelIndex].timeLimit - timeleft,
            })
        );
        if (timeleft <= 0) {
            handleNextLevel({ failed: true });
            enqueueSnackbar('Time up', {
                variant: 'warning',
            });
        }
        if (timeleft !== 0 && !isGameOver && timeleft % 5 === 0) {
            saveGame();
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
            handleGameOver({ isPassed: !isFailed });
        }
    });

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
                    <AnswerInputField
                        isGameSaving={isGameSaving}
                        handleNextLevel={handleNextLevel}
                    />
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
