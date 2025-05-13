import express from 'express';
import authMiddelware from '../middlware/authMiddlware.js'
import { addStadium, getStadiums, getStadium, updateStadium, deleteStadium } from '../controllers/stadiumController.js';


const router = express.Router();

router.get('/', authMiddelware, getStadiums) 
router.post('/add', authMiddelware, addStadium) 
router.get('/:id', authMiddelware, getStadium) 
router.put('/:id', authMiddelware, updateStadium) 
router.delete('/:id', authMiddelware, deleteStadium) 

export default router;