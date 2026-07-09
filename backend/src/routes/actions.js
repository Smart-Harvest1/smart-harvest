import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { authMiddleware } from '../auth.js';
import { authorize } from '../middleware/roleMiddleware.js';
import {
  listActions,
  getAction,
  createAction,
  updateAction,
  deleteAction,
} from '../controllers/actionController.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', asyncHandler(listActions));
router.get('/:id', asyncHandler(getAction));
router.post('/', asyncHandler(createAction));
router.patch('/:id', authorize('ADMIN'), asyncHandler(updateAction));
router.delete('/:id', authorize('ADMIN'), asyncHandler(deleteAction));

export default router;
