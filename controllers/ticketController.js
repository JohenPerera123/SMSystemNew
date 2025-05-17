import Ticket from '../models/Ticket.js'; 
import Event from '../models/Event.js';

// Generate seat number based on how many tickets already booked
async function generateSeatNumber(eventId) {
  const ticketCount = await Ticket.countDocuments({ event: eventId });
  return `S-${ticketCount + 1}`;
}

// Fetch all tickets for a given event
export const getTicketsByEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const tickets = await Ticket.find({ event: eventId });
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets.' });
  }
};

// Fetch all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// Book a ticket
export const bookTicket = async (req, res) => {
  try {
    const { eventId, name } = req.body;

    if (!eventId || !name) {
      return res.status(400).json({ error: 'Event ID and name are required.' });
    }

    const event = await Event.findById(eventId).populate('stadium');
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const capacity = event.stadium.Std_capacity;
    const ticketsBooked = await Ticket.countDocuments({ event: eventId });
    const availableSeats = capacity - ticketsBooked;

    if (availableSeats <= 0) {
      return res.status(400).json({ error: 'No available seats for this event.' });
    }

    const seatNumber = await generateSeatNumber(eventId);

    const newTicket = new Ticket({
      name,
      event: event._id,
      stadiumName: event.stadium.Std_name,
      eventName: event.eventName,
      eventDate: event.eventDate,
      startTime: event.startTime,
      endTime: event.endTime,
      capacity,
      seatNumber
    });

    await newTicket.save();

    // Optional: update ticketsBooked field (if you’re tracking it separately)
    event.ticketsBooked = ticketsBooked + 1;
    await event.save();

    res.status(201).json({
      message: 'Ticket booked successfully.',
      ticket: newTicket
    });

  } catch (error) {
    console.error('Error booking ticket:', error);

    if (error.code === 11000 && error.keyPattern?.seatNumber) {
      return res.status(409).json({ error: 'Seat number conflict. Try again.' });
    }

    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Group tickets by booking date for the last 7 days
export const getTicketTrend = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // includes today

    const tickets = await Ticket.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json(tickets);
  } catch (err) {
    console.error('Error generating ticket trend:', err);
    res.status(500).json({ error: 'Failed to generate ticket trend data' });
  }
};
