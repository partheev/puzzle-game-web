import React from 'react';
import { Card } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../../hooks/redux';
export const AvgTimeScore = () => {
    const { avgGameDetails } = useAppSelector((state) => state.admin);

    const labels = avgGameDetails.map(
        (game) => 'Level ' + String(game.level + 1)
    );
    const avgScores = avgGameDetails.map((game) =>
        Math.trunc(game.details.avgScore)
    );
    const avgTimes = avgGameDetails.map((game) =>
        Math.trunc(game.details.avgTime)
    );
    return (
        <Card sx={{ padding: '1rem', borderRadius: '20px' }}>
            <ReactApexChart
                options={{
                    chart: {
                        height: 350,
                        type: 'line',
                    },
                    stroke: {
                        width: [0, 4],
                    },
                    title: {
                        text: 'Avg. Score and Time spent on each level',
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [1],
                    },
                    labels: labels,

                    yaxis: [
                        {
                            title: {
                                text: 'Level Avg. Scores',
                            },
                        },
                        {
                            opposite: true,
                            title: {
                                text: 'Time Spent on each level',
                            },
                        },
                    ],
                }}
                series={[
                    {
                        name: 'Avg. Score',
                        type: 'column',
                        data: avgScores,
                    },
                    {
                        name: 'Avg. Time',
                        type: 'line',
                        data: avgTimes,
                    },
                ]}
                type='line'
                height={350}
            />
        </Card>
    );
};
