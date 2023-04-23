import React, { FC } from 'react';
import { Card, Typography, Divider } from '@mui/material';

interface Props {
    text: string;
    count: number;
}
export const InfoCard: FC<Props> = ({ text, count }) => {
    return (
        <Card
            sx={{
                marginY: '1rem',
                padding: '2rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: '10rem',
            }}
        >
            <Typography variant='h5' textAlign={'center'}>
                {text}
            </Typography>
            <Divider />
            <Typography variant='h4' textAlign={'center'}>
                {count}
            </Typography>
        </Card>
    );
};
