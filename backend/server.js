import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/users.js';
import actionRoutes from './src/routes/actions.js';
import errorHandler from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/actions', actionRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
