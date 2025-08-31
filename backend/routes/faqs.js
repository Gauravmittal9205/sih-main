import express from 'express';
import { getFaqs } from '../controllers/faqs.js';
const router = express.Router();
router.get('/', getFaqs);
export default router;
