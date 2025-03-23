import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/env';
import itemRoutes from './routes/item.routes';
import folderRoutes from './routes/folder.routes';
import elementRoutes from './routes/elements.routes';

const app = express();

app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());

// API routes
app.use('/api/elements', elementRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/folders', folderRoutes);
// Mongo connection
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

export default app;
