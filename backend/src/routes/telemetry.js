import express from 'express';
import { listTelemetry, createTelemetry, deleteTelemetry } from '../controllers/telemetryController.js';
import { authMiddleware, authorize } from '../auth.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', listTelemetry);
router.post('/', authorize('ADMIN', 'TECHNICIAN'), createTelemetry);
router.delete('/:id', authorize('ADMIN', 'TECHNICIAN'), deleteTelemetry);

export default router;
