import express from 'express';
import authMiddelware from '../middlware/authMiddlware.js';
import { addEventbooking, deleteEventbooking, getEventbooking, getEventsbooking, updateEventbooking } from '../controllers/eventbookingController.js';


const router = express.Router();

router.get('/', authMiddelware,getEventsbooking);
router.post('/add', authMiddelware, addEventbooking);
router.get('/:id', authMiddelware, getEventbooking);
router.put('/:id', authMiddelware, updateEventbooking);
router.delete('/:id', authMiddelware, deleteEventbooking);

export default router;
