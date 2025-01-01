/* eslint-disable no-console */
import mongoose from 'mongoose';
import { MONGODB_URL } from '../constants/envVariables';
const reconnectTimeout = 5000; // ms
function connect() {
  mongoose.connect(MONGODB_URL);
}
const db = mongoose.connection;

db.on('connecting', () => {
  console.info('Connecting to MongoDB...');
});

db.on('error', error => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect();
});

db.on('connected', () => {
  console.info('Connected to MongoDB!');
});

db.on('error', error => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect();
});

db.on('reconnected', () => {
  console.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
  console.error(
    `MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`,
  );
  setTimeout(() => connect(), reconnectTimeout);
});

connect();
