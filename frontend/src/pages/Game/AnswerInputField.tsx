import React, { FC, useState, useRef, useEffect } from 'react';
import { Button, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { arrayToString, compareArrays } from '../../utils/utils';
import { puzzleData } from '../../data/puzzleData';
import { nextLevel, reduceAttempts } from '../../store/slices/gameSlice';
import { enqueueSnackbar } from 'notistack';

interface Props {
    isGameSaving: boolean;
    handleNextLevel: (ob: { failed: boolean }) => Promise<void>;
}

let currentAnswerIndex = 0;

const AnswerInputField: FC<Props> = ({
    isGameSaving,
    handleNextLevel,
}): JSX.Element => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const dispatch = useAppDispatch();
    const attemptsLeft = useAppSelector((state) => state.game.attemptsLeft);
    const currentLevelIndex = useAppSelector(
        (state) => state.game.currentLevelIndex
    );
    const [answer, setanswer] = useState<string[]>(
        new Array(puzzleData[currentLevelIndex].word.length).fill('')
    );

    const [activeAnswerIndex, setactiveAnswerIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const currentImagesOrder = useAppSelector(
        (state) => state.game.currentImagesOrder
    );

    const correctImagesOrder = puzzleData[currentLevelIndex].correctImagesOrder;

    const isImageArrangementCorrect = compareArrays(
        currentImagesOrder,
        correctImagesOrder
    );

    const handleOnChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = target;
        const newAnswer = [...answer];
        newAnswer[currentAnswerIndex] = !value
            ? ''
            : value.substring(value.length - 1).toUpperCase();

        if (!value) setactiveAnswerIndex(currentAnswerIndex - 1);
        else setactiveAnswerIndex(currentAnswerIndex + 1);

        setanswer(newAnswer);
    };

    const handleOnKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        currentAnswerIndex = index;
        if (e.key === 'Backspace') {
            setactiveAnswerIndex(currentAnswerIndex - 1);
        }
    };

    const handleSubmitWord = async () => {
        const levelIndex = currentLevelIndex;
        const correctAnswer = puzzleData[levelIndex].word;

        if (arrayToString(answer) === correctAnswer) {
            await handleNextLevel({ failed: false });
        } else {
            if (attemptsLeft === 1) {
                await handleNextLevel({ failed: true });
            } else {
                dispatch(reduceAttempts());
            }
        }
    };

    useEffect(() => {
        if (attemptsLeft !== 5)
            enqueueSnackbar(`${attemptsLeft} attemps left. Try again`, {
                variant: 'error',
                autoHideDuration: 2000,
            });
    }, [attemptsLeft]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeAnswerIndex]);

    useEffect(() => {
        setanswer(
            new Array(puzzleData[currentLevelIndex].word.length).fill('')
        );
    }, [currentLevelIndex]);

    return (
        <Grid container>
            <Grid columnSpacing={'1rem'} width={'100%'} item sm={12} md={8}>
                <div
                    style={{
                        marginTop: isSmallScreen ? '1rem' : '2rem',
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        alignItems: 'center',
                        columnGap: '1.5rem',
                    }}
                >
                    <h3>Enter word</h3>
                    <div>
                        {answer.map((_, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <input
                                        style={{
                                            width: isSmallScreen
                                                ? '1.3rem'
                                                : '2.5rem',
                                            height: isSmallScreen
                                                ? '2.3rem'
                                                : '3.5rem',
                                            marginRight: '0.5rem',
                                            borderRadius: '10px',
                                            textAlign: 'center',
                                            fontSize: isSmallScreen
                                                ? '1rem'
                                                : '1.7rem',
                                            outlineColor: 'skyblue',
                                            border: '1px solid gray',
                                        }}
                                        ref={
                                            index === activeAnswerIndex
                                                ? inputRef
                                                : null
                                        }
                                        value={answer[index]}
                                        onChange={(e) => handleOnChange(e)}
                                        onKeyDown={(e) =>
                                            handleOnKeyDown(e, index)
                                        }
                                        type='text'
                                        className='w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition'
                                    />
                                    {index === answer.length - 1 ? null : (
                                        <span className='w-2 py-0.5 bg-gray-400' />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </Grid>
            <Grid item sm={12} md={4} width={'100%'}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isSmallScreen ? 'center' : 'end',
                    }}
                >
                    <div
                        style={{
                            height: '4rem',
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '0.5rem',
                        }}
                    >
                        {isGameSaving && (
                            <>
                                <CircularProgress
                                    size='1.5rem'
                                    sx={{ color: 'gray' }}
                                />
                                <h5 style={{ color: 'gray' }}>
                                    Game saving......
                                </h5>
                            </>
                        )}
                    </div>
                    <Button
                        disabled={!isImageArrangementCorrect}
                        onClick={handleSubmitWord}
                        variant='contained'
                    >
                        Submit Word
                    </Button>
                    <h5 style={{ color: 'gray' }}>
                        Attempts left: {attemptsLeft}
                    </h5>
                </div>
            </Grid>
        </Grid>
    );
};

export default AnswerInputField;
