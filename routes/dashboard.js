// server/routes/dashboard.js

import express from 'express';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Stadium from '../models/Stadium.js';
import Ticket from '../models/Ticket.js';
import Crm from '../models/Crm.js';

const router = express.Router();

router.get('/counts', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const eventCount = await Event.countDocuments();
    const stadiumCount = await Stadium.countDocuments();
    const ticketCount = await Ticket.countDocuments();
    const crmCount = await Crm.countDocuments();

    res.json({
      userCount,
      eventCount,
      stadiumCount,
      ticketCount,
      crmCount,
    });
  } catch (err) {
    console.error('Error fetching counts:', err);
    res.status(500).json({ error: 'Server error fetching counts' });
  }
});

export default router;
