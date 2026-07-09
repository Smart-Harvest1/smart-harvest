import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { authMiddleware } from '../auth.js';
import { authorize } from '../middleware/roleMiddleware.js';
import {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', authorize('ADMIN'), asyncHandler(listUsers));
router.get('/:id', asyncHandler(getUserById));
router.post('/', authorize('ADMIN'), asyncHandler(createUser));
router.patch('/:id', asyncHandler(updateUser));
router.delete('/:id', authorize('ADMIN'), asyncHandler(deleteUser));

export default router;
