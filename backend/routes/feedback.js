import express from 'express';
import { submitFeedback, listFeedback } from '../controllers/feedback.js';
const router = express.Router();
router.post('/', submitFeedback);
router.get('/', listFeedback);
export default router;
