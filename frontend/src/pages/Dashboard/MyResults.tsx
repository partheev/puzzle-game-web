import { Divider } from '@mui/material';
import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';

const RowHeader = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ width: '1%' }}></div>
            <h3 style={{ width: '33%', textAlign: 'end' }}>Score</h3>
            <h3 style={{ width: '33%', textAlign: 'end' }}>Time Spent</h3>
            <h3 style={{ width: '33%', textAlign: 'end' }}>Result</h3>
        </div>
    );
};
interface ResultRowProps {
    no: number;
    score: number;
    timeSpent: number;
    result: string;
}
const ResultRow: FC<ResultRowProps> = ({ no, score, timeSpent, result }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <h3 style={{ width: '1%', textAlign: 'end' }}>{no}</h3>
            <h3 style={{ width: '33%', textAlign: 'end' }}>{score}</h3>
            <h3 style={{ width: '33%', textAlign: 'end' }}>{timeSpent}</h3>
            <h3
                style={{
                    width: '33%',
                    textAlign: 'end',
                    color: result === 'Pass' ? 'green' : 'red',
                }}
            >
                {result}
            </h3>
        </div>
    );
};
export const MyResults = () => {
    const { lastPlayedGames } = useAppSelector((state) => state.user);
    return (
        <div
            style={{
                backgroundColor: 'white',
                borderRadius: '40px',
                padding: '0.5rem 2rem 2rem 2rem',
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Last Games</h2>

            <RowHeader />
            <Divider />
            <div
                style={{
                    height: '15rem',
                    overflowY: 'scroll',
                }}
            >
                {lastPlayedGames.map((game, index) => {
                    return (
                        <ResultRow
                            no={index + 1}
                            result={game.result}
                            score={game.score}
                            timeSpent={game.timeSpent}
                        />
                    );
                })}
            </div>
        </div>
    );
};
