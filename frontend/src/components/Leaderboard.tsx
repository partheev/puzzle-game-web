import React, { FC } from 'react';
import { Card, Divider } from '@mui/material';
import { useAppSelector } from '../hooks/redux';

interface Props {
    isAdmin?: boolean;
}
export const Leaderboard: FC<Props> = ({ isAdmin }) => {
    const { leadershipBoard } = useAppSelector((state) => state.game);
    return (
        <Card sx={{ borderRadius: '20px', padding: '1rem 2rem' }}>
            <h2
                style={{
                    textAlign: 'center',
                    textDecoration: 'underline',
                    margin: '0.5rem 0',
                }}
            >
                Leaderboard
            </h2>
            <RowHeader />
            <Divider />
            <div
                style={{
                    overflowY: 'scroll',
                    maxHeight: '15rem',
                }}
            >
                {leadershipBoard.leaderboard.map((gameDetail, index) => {
                    return (
                        <ResultRow
                            key={
                                index +
                                ' ' +
                                gameDetail.username +
                                ' ' +
                                gameDetail.time +
                                ' ' +
                                gameDetail.score
                            }
                            isCurrentUser={false}
                            rank={index + 1}
                            score={gameDetail.score}
                            timeSpent={gameDetail.time}
                            username={gameDetail.username}
                        />
                    );
                })}
            </div>
        </Card>
    );
};

const RowHeader = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <h3 style={{ width: '1%', textAlign: 'end' }}>Rank</h3>
            <h3 style={{ width: '33%', textAlign: 'end' }}>Username</h3>
            <h3 style={{ width: '33%', textAlign: 'end' }}>Time Spent</h3>
            <h3 style={{ width: '33%', textAlign: 'end' }}>Score</h3>
        </div>
    );
};
interface ResultRowProps {
    rank: number;
    score: number;
    timeSpent: number;
    username: string;
    isCurrentUser: boolean;
}
const ResultRow: FC<ResultRowProps> = ({
    rank,
    score,
    timeSpent,
    username,
    isCurrentUser,
}) => {
    const minutes = parseInt(String(timeSpent / 60));
    const seconds = timeSpent % 60;
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <h3 style={{ width: '1%', textAlign: 'end' }}>{rank}</h3>
            <h3 style={{ width: '33%', textAlign: 'end' }}>{username}</h3>
            <h3 style={{ width: '33%', textAlign: 'end' }}>
                {minutes} Min {seconds} Sec
            </h3>
            <h3
                style={{
                    width: '33%',
                    textAlign: 'end',
                }}
            >
                {Math.floor(score)}
            </h3>
        </div>
    );
};
