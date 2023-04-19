import React from 'react';
import Header from '../../components/layout/Header';
import { Container } from '@mui/material';
import { MyResults } from './MyResults';
import { PlayGame } from './PlayGame';
import { GameInstructions } from '../../components/Popups/GameInstructions';

export const Dashboard = () => {
    return (
        <div style={{ backgroundColor: 'gray' }}>
            <Header />
            <GameInstructions handleClose={() => {}} />
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
                    <PlayGame />
                    <PlayGame />
                </div>
                <MyResults />
            </Container>
        </div>
    );
};
