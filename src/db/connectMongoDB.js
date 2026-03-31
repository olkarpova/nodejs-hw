import mongoose from 'mongoose';
import { Note } from '../models/note.js';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
    await Note.syncIndexes(); // синхронізуємо індекси
    console.log('Indexes synced successfully');
  } catch (error) {
    console.log('Error connecting to database', error.message);
    process.exit(1); //зупинити процесс
  }
};
