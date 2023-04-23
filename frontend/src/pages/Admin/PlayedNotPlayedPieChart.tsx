import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../../hooks/redux';
import { Card } from '@mui/material';
export const PlayedNotPlayedPieChart = () => {
    const { registeredUser, totalUsersPlayed } = useAppSelector(
        (state) => state.admin
    );

    const series = [totalUsersPlayed, registeredUser - totalUsersPlayed];

    return (
        <Card
            sx={{
                borderRadius: '20px',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // padding: '1rem',
            }}
        >
            <ReactApexChart
                options={{
                    chart: {
                        // width: 380,
                        type: 'pie',
                    },
                    title: {
                        text: 'Users attempting the puzzle',
                    },
                    labels: ['Attempted', 'Not Attempted'],
                    responsive: [
                        {
                            // breakpoint: 480,
                            options: {
                                chart: {
                                    // width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                }}
                series={series}
                type='pie'
                width={350}
            />
        </Card>
    );
};
