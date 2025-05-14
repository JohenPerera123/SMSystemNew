import Ticket from '../models/Ticket.js'; 
import Event from '../models/Event.js';
import Stadium from '../models/Stadium.js';

// Auto-increment seat number generator (can be improved with UUID or DB sequence)
let seatCounter = 1;
function generateSeatNumber() {
    return `S-${seatCounter++}`;
}


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


// Book a ticket
export const bookTicket = async (req, res) => {
    try {
        const { eventId, name } = req.body;

        if (!eventId || !name) {
            return res.status(400).json({ error: 'Event ID and name are required.' });
        }

        // Find the event and populate stadium
        const event = await Event.findById(eventId).populate('stadium');
        if (!event) return res.status(404).json({ error: 'Event not found.' });

        const capacity = event.stadium.Std_capacity;
        const ticketsBooked = event.ticketsBooked || 0;
        const availableSeat = capacity - ticketsBooked;

        if (availableSeat <= 0) {
            return res.status(400).json({ error: 'No available seats for this event.' });
        }

        // Create new ticket
        const newTicket = new Ticket({
            name,
            event: event._id,
            stadiumName: event.stadium.Std_name,
            eventName: event.eventName,
            eventDate: event.eventDate,
            startTime: event.startTime,
            endTime: event.endTime,
            capacity,
            availableSeat: availableSeat - 1,  // display purposes
            seatNumber: generateSeatNumber()
        });

        await newTicket.save();

        // Increment ticketsBooked in the Event model
        event.ticketsBooked = ticketsBooked + 1;
        await event.save();

        res.status(201).json({
            message: 'Ticket booked successfully.',
            ticket: newTicket
        });

    } catch (error) {
        console.error('Error booking ticket:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
