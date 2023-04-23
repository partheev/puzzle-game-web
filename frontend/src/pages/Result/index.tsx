import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import { Container } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Leaderboard } from '../../components/Leaderboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const Result = () => {
    const { isFailed, levelScore } = useAppSelector((state) => state.game);
    const location = useLocation();
    const navigate = useNavigate();
    const totalScore = levelScore.reduce((prev, curr) => {
        return prev + curr;
    }, 0);

    const handleBack = () => {
        navigate('/dashboard');
    };
    useEffect(() => {
        if (!location.state?.gamePlay) {
            navigate('/dashboard');
        }
    }, []);
    return (
        <div className='result-bg'>
            <Header />
            <div style={{ minHeight: '90vh' }}>
                <Container maxWidth='md' sx={{ position: 'relative' }}>
                    <ArrowBackIcon
                        sx={{
                            fontSize: '2.5rem',
                            color: 'white',
                            position: 'absolute',
                            top: '0',
                            left: '1rem',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            handleBack();
                        }}
                    />
                    <h1
                        style={{
                            fontSize: '2.5rem',
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        Result
                    </h1>
                    <h2
                        style={{
                            color: !isFailed ? 'green' : 'red',
                            textAlign: 'center',
                            fontFamily: 'sans-serif',
                        }}
                    >
                        {!isFailed ? 'Passed' : 'Failed'}
                    </h2>
                    <h2
                        style={{
                            textAlign: 'center',
                            fontFamily: 'sans-serif',
                        }}
                    >
                        Score : {totalScore}
                    </h2>
                    <div style={{ marginTop: '2rem' }}>
                        <Leaderboard isAdmin={false} />
                    </div>
                </Container>
            </div>
        </div>
    );
};
