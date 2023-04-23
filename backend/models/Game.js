import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        isPassed: Boolean,
        totalScore: {
            type: Number,
            required: true,
        },
        totalTime: {
            type: Number,
            required: true,
        },

        gameScores: [
            {
                score: Number,
                time: Number,
            },
        ],
    },
    { timestamps: true }
);

export const GameModel = mongoose.model('Game', gameSchema);
