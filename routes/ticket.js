import express from 'express';
import { bookTicket, getTicketsByEvent, getAllTickets } from '../controllers/ticketController.js';
import { getTicketTrend } from '../controllers/ticketController.js';
const router = express.Router();

router.post('/book', bookTicket);
router.get('/event/:eventId', getTicketsByEvent);
router.get('/', getAllTickets)
router.get('/trend', getTicketTrend);

export default router;