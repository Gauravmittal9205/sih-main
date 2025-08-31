import express from 'express';
import { createAlert, getAlerts, deleteAlert } from '../controllers/alerts.js';
const router = express.Router();
router.post('/', createAlert);
router.get('/', getAlerts);
router.delete('/:id', deleteAlert);
export default router;
