import express from 'express';
import { getStats } from '../controllers/statsController.js';
import { authMiddleware } from '../auth.js';

const router = express.Router();

router.get('/', authMiddleware, getStats);

export default router;
