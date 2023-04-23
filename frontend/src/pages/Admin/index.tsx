import React from 'react';
import Header from '../../components/layout/Header';
import { Container, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { PassedVsFailedChart } from './PassedVsFailedChart';
import { PlayedNotPlayedPieChart } from './PlayedNotPlayedPieChart';
import { InfoCard } from './InfoCard';
import { AvgTimeScore } from './AvgTimeScore';
import { Leaderboard } from '../../components/Leaderboard';
export const AdminPage = () => {
    const { registeredUser, totalAttempts } = useAppSelector(
        (state) => state.admin
    );
    return (
        <>
            <Header />
            <div
                style={{
                    minHeight: '90vh',
                    backgroundColor: 'var(--bg)',
                    paddingBottom: '5rem',
                }}
            >
                <Container maxWidth='lg'>
                    <h1
                        style={{
                            textAlign: 'center',
                            margin: '0',
                            padding: '2rem 0',
                            textDecoration: 'underline',
                        }}
                    >
                        Players Analytics
                    </h1>

                    <Grid container columnSpacing={'2rem'} rowSpacing={'2rem'}>
                        <Grid item lg={4} sm={12}>
                            <PassedVsFailedChart />
                        </Grid>
                        <Grid item lg={4} sm={12}>
                            <PlayedNotPlayedPieChart />
                        </Grid>
                        <Grid item lg={4} sm={12}>
                            <InfoCard
                                count={totalAttempts}
                                text={'Total Attempts'}
                            />
                            <InfoCard
                                count={registeredUser}
                                text={'Total Registered Users'}
                            />
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <AvgTimeScore />
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Leaderboard />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
};
