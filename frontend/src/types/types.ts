export interface LeaderBoard {
    leaderboard: {
        score: number;
        time: number;
        username: string;
        user_id: string;
    }[];
    user_position: {
        rank: number;
        score: number;
        time: number;
        username: string;
        user_id: string;
    } | null;
}
