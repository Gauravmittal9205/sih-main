import express from 'express';
import { createFarm, getFarms, getFarmById, updateFarm, deleteFarm } from '../controllers/farms.js';
const router = express.Router();
router.post('/', createFarm);
router.get('/', getFarms);
router.get('/:id', getFarmById);
router.put('/:id', updateFarm);
router.delete('/:id', deleteFarm);
export default router;
