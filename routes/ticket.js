import express from 'express';
import { bookTicket, getTicketsByEvent, getAllTickets } from '../controllers/ticketController.js';
const router = express.Router();

router.post('/book', bookTicket);
router.get('/event/:eventId', getTicketsByEvent);
router.get('/', getAllTickets)

export default router;