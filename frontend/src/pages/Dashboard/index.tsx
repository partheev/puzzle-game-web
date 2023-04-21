import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import { Container } from '@mui/material';
import { MyResults } from './MyResults';
import { PlayGame } from './PlayGame';
import { GameInstructions } from '../../components/Popups/GameInstructions';
import { Advantages } from './Advantages';
import { useNavigate } from 'react-router-dom';
import { ResultChart } from './ResultChart';

export const Dashboard = () => {
    const [showInstructions, setshowInstructions] = useState(false);
    const navigate = useNavigate();
    const handleStart = () => {
        navigate('/game');
    };

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
                <div
                    style={{
                        display: 'flex',
                        marginBottom: '2rem',
                        columnGap: '2rem',
                    }}
                >
                    <Advantages />
                    <PlayGame
                        startGameHandler={() => setshowInstructions(true)}
                    />
                </div>
                <ResultChart />
                <MyResults />
            </Container>
        </div>
    );
};
