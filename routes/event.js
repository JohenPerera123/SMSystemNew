import express from 'express';
import authMiddelware from '../middlware/authMiddlware.js';
import {
  addEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', authMiddelware, getEvents);
router.post('/add', authMiddelware, addEvent);
router.get('/:id', authMiddelware, getEvent);
router.put('/:id', authMiddelware, updateEvent);
router.delete('/:id', authMiddelware, deleteEvent);

export default router;
