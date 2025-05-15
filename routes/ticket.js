import express from 'express';
import { bookTicket, getTicketsByEvent } from '../controllers/ticketController.js';
const router = express.Router();

router.post('/book', bookTicket);
router.get('/event/:eventId', getTicketsByEvent);

export default router;