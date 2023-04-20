import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    isPassed: Boolean,
    gameScores: [
        {
            score: Number,
            time: Number,
        },
    ],
});

export const GameModel = mongoose.model('Game', gameSchema);
