import express from 'express';
import { createCompliance, getCompliance, updateCompliance, deleteCompliance } from '../controllers/compliance.js';
const router = express.Router();
router.post('/', createCompliance);
router.get('/', getCompliance);
router.put('/:id', updateCompliance);
router.delete('/:id', deleteCompliance);
export default router;
