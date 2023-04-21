import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../../hooks/redux';
const data = {
    series: [
        {
            name: 'Website Blog',
            type: 'column',
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
        },
        {
            name: 'Social Media',
            type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
        },
    ],
    options: {
        chart: {
            height: 350,
            type: 'line',
        },
        stroke: {
            width: [0, 4],
        },
        title: {
            text: 'Traffic Sources',
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
        },
        labels: [
            '01 Jan 2001',
            '02 Jan 2001',
            '03 Jan 2001',
            '04 Jan 2001',
            '05 Jan 2001',
            '06 Jan 2001',
            '07 Jan 2001',
            '08 Jan 2001',
            '09 Jan 2001',
            '10 Jan 2001',
            '11 Jan 2001',
            '12 Jan 2001',
        ],
        xaxis: {
            type: 'datetime',
        },
        yaxis: [
            {
                title: {
                    text: 'Website Blog',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Social Media',
                },
            },
        ],
    },
};

export const ResultChart = () => {
    const lastPlayedGames = useAppSelector(
        (state) => state.user.lastPlayedGames
    );
    const series = [
        {
            name: 'Score',
            type: 'column',
            data: lastPlayedGames.map((game) => game.score),
        },
        {
            name: 'Time Spent',
            type: 'line',
            data: lastPlayedGames.map((game) => game.timeSpent),
        },
    ];
    const labels = lastPlayedGames.map((_) => '');
    return (
        <div
            style={{
                margin: '1rem 0',
                backgroundColor: 'white',
                borderRadius: '40px',
                padding: '2rem',
            }}
        >
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
                        text: 'Last Games Results',
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [1],
                    },
                    labels: labels,
                    xaxis: {
                        type: 'category',
                    },
                    yaxis: [
                        {
                            title: {
                                text: 'Score',
                            },
                        },
                        {
                            opposite: true,
                            title: {
                                text: 'Time Spent',
                            },
                        },
                    ],
                }}
                series={series}
                type='line'
                height={350}
            />
        </div>
    );
};
