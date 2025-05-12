import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { addStadium } from '../server/controllers/stadiumController';

const router = express.Router();

router.post('/add', authMiddleware, addStadium)

export default router;