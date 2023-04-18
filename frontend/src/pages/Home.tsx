import React from 'react';
import { Container, Box, Button } from '@mui/material';
export const Home = () => {
    return (
        <Container maxWidth='md'>
            <Box
                sx={{
                    height: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                }}
            >
                <Box sx={{}}></Box>
                <h1 style={{ fontFamily: '' }}>
                    Want to validate your soft skills?
                </h1>
                <h3>
                    Solve the puzzle game and measure your soft skills score
                </h3>

                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: 'skyblue',
                        ':hover': { backgroundColor: 'gray' },
                    }}
                >
                    Play Game
                </Button>
            </Box>
        </Container>
    );
};
