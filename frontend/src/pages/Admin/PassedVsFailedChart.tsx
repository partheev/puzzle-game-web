import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../../hooks/redux';
import { Card } from '@mui/material';
export const PassedVsFailedChart = () => {
    const { attemptsFailed, attemptsPassed } = useAppSelector(
        (state) => state.admin
    );
    return (
        <Card sx={{ padding: '1rem', borderRadius: '20px' }}>
            <ReactApexChart
                options={{
                    chart: {
                        type: 'bar',
                        height: 380,
                    },
                    xaxis: {
                        type: 'category',
                        group: {
                            style: {
                                fontSize: '20px',
                                fontWeight: 700,
                            },
                        },
                    },
                    title: {
                        text: 'Passed vs Failed attempts of all users',
                    },
                    // tooltip: {
                    //   x: {
                    //     formatter: function(val) {
                    //       return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY")
                    //     }
                    //   }
                    // },
                }}
                series={[
                    {
                        name: 'Attempts Passed',
                        data: [
                            {
                                x: 'Attempts Passed',
                                y: attemptsPassed,
                            },
                        ],
                    },
                    {
                        name: 'Attempts Failed',
                        data: [
                            {
                                x: 'Attempts Failed',
                                y: attemptsFailed,
                            },
                        ],
                    },
                ]}
                type='bar'
                height={380}
            />
        </Card>
    );
};
