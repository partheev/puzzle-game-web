import React from 'react';
import { Container, Box, Button, Stack } from '@mui/material';
import homeBgImage from '../assets/home-bg.jpg';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    return (
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
            <Stack flexDirection={'row'} alignItems={'center'} rowGap={'1rem'}>
                <img
                    style={{ width: '5rem' }}
                    src='/images/logo.png'
                    alt='logo'
                />
                <h1 style={{ color: 'white', fontFamily: '' }}>Think Deep</h1>
            </Stack>
        </div>
    );
};
export const Home = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: `url(${homeBgImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPositionY: 'top',
                backgroundPositionX: 'left',
            }}
        >
            <Container maxWidth='lg' sx={{ height: '100%' }}>
                <Box
                    sx={{
                        height: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'start',
                    }}
                >
                    <Logo />
                    <h1
                        style={{
                            margin: '0',
                            fontSize: '2rem',
                            fontFamily: 'var(--style-title-font)',
                            color: 'white',
                        }}
                    >
                        Want to validate your soft skills?
                    </h1>
                    <h3
                        style={{
                            fontFamily: 'var(--standard-title-font)',
                            color: 'white',
                        }}
                    >
                        Solve the puzzle game and measure your soft skills score
                    </h3>

                    <Button
                        onClick={() => {
                            navigate('/auth');
                        }}
                        variant='contained'
                        sx={{
                            fontWeight: '700',
                            backgroundColor: 'var(--primary)',
                            ':hover': { backgroundColor: 'gray' },
                        }}
                    >
                        Play Game
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};
