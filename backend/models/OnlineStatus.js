import mongoose from 'mongoose';

const onlineSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    currentLevel: {
        type: Number,
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
