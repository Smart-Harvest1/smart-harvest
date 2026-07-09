import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { authMiddleware } from '../auth.js';
import { signup, login, me } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.get('/me', authMiddleware, asyncHandler(me));

export default router;
