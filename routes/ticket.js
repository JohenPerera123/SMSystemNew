import express from 'express';
<<<<<<< HEAD
import { bookTicket, getTicketsByEvent, getAllTickets } from '../controllers/ticketController.js';
=======
import { bookTicket, getTicketsByEvent, getTicketTrend } from '../controllers/ticketController.js';
>>>>>>> cfac658 (sixth commit)
const router = express.Router();

router.post('/book', bookTicket);
router.get('/event/:eventId', getTicketsByEvent);
<<<<<<< HEAD
router.get('/', getAllTickets)
=======
router.get('/trend', getTicketTrend);

>>>>>>> cfac658 (sixth commit)

export default router;