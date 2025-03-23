import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/realtime-app',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};