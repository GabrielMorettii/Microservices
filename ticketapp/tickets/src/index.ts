import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const { TICKETS_MONGO_URI, JWT_KEY } = process.env;

  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!TICKETS_MONGO_URI) {
    throw new Error('TICKETS_MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(TICKETS_MONGO_URI);
    console.log('Tickets service connected to mongodb');
  } catch (error) {
    console.error('Error connecting to mongodb: ', error);
  }
  
  app.listen(3000, () => console.log(`Ready at http://locahost:3000`));
};

start();
