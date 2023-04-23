import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { MyResults } from './MyResults';
import { PlayGame } from './PlayGame';
import { GameInstructions } from '../../components/Popups/GameInstructions';
import { Advantages } from './Advantages';
import { useNavigate } from 'react-router-dom';
import { ResultChart } from './ResultChart';
import { useDispatch } from 'react-redux';
import { gameStart } from '../../store/slices/gameSlice';
import {
    startUserLoading,
    stopUserLoading,
    updateLastGames,
} from '../../store/slices/userSlice';
import { GameAPI } from '../../services/api/Game';

export const Dashboard = () => {
    const [showInstructions, setshowInstructions] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleStart = () => {
        dispatch(gameStart());
        navigate('/game');
    };

    const fetchLastPlayedGames = async () => {
        try {
            dispatch(startUserLoading());
            const lastPlayedGamesRes = await GameAPI.lastPlayedGames();
            dispatch(updateLastGames({ lastPlayedGames: lastPlayedGamesRes }));
            dispatch(stopUserLoading());
        } catch (err) {
            dispatch(stopUserLoading());
        }
    };

    useEffect(() => {
        fetchLastPlayedGames();
    }, []);
    return (
        <div className='dashboard-bg' style={{}}>
            <Header />
            {showInstructions && (
                <GameInstructions
                    handleStart={handleStart}
                    isStartButton
                    handleClose={() => {
                        setshowInstructions(false);
                    }}
                />
            )}
            <Container
                maxWidth='md'
                sx={{
                    minHeight: '90vh',
                    padding: '2rem',
                }}
            >
                <Grid
                    sx={{ marginBottom: '2rem' }}
                    container
                    rowSpacing={'1rem'}
                    columnSpacing={'1rem'}
                >
                    <Grid item md={6} sm={12} width={'100%'}>
                        <Advantages />
                    </Grid>

                    <Grid item md={6} sm={12} width={'100%'}>
                        <PlayGame
                            startGameHandler={() => setshowInstructions(true)}
                        />
                    </Grid>
                </Grid>
                <MyResults />
                <ResultChart />
            </Container>
        </div>
    );
};
