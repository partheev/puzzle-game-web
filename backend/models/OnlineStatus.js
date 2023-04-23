import mongoose from 'mongoose';

const onlineSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    currentLevel: {
        type: Number,
        required: true,
    },
    hintsUsed: {
        type: Number,
        required: true,
    },
    imageOrder: [
        {
            type: Number,
            required: true,
        },
    ],
    timeLeft: {
        type: Number,
        required: true,
    },
    scores: {
        type: Map,
        of: {
            score: Number,
            time: Number,
        },
    },
});

export const OnlineModel = mongoose.model('Online', onlineSchema);
