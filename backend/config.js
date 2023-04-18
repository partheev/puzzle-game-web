import mongoose from 'mongoose';

export const connectDB = async () => {
    // establish connection to db
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('Database connect');
    } catch (err) {
        console.log('Database not connected.');
        console.log('Database connection error: ', err);
        process.exit(1);
    }
};
