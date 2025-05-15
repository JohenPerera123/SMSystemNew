import Event from '../models/Event.js';

// Add a new Event
const addEvent = async (req, res) => {
    try {
        const { eventName, eventDate, stadium, startTime, endTime } = req.body;

        // Check if an event already exists with same stadium, date, and time
        const existingEvent = await Event.findOne({
            stadium,
            eventDate,
            startTime,
            endTime
        });

        if (existingEvent) {
            return res.status(400).json({
                success: false,
                error: 'An event with the same stadium, date, and time already exists.'
            });
        }

        const overlappingEvent = await Event.findOne({
      stadium,
      eventDate,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (overlappingEvent) {
      return res.status(400).json({
        success: false,
        error: 'An overlapping event already exists for this stadium, date, and time range.'
      });
    }
        // const { eventName, eventDate, stadium, startTime, endTime } = req.body;

        const newEvent = new Event({
            eventName,
            eventDate,
            stadium,
            startTime,
            endTime
        });

        await newEvent.save();

        return res.status(200).json({ success: true, event: newEvent });
    } catch (error) {
        console.error('Add event error:', error);
        return res.status(500).json({
            success: false,
            error: 'Add event error'
        });
    }
};

// Get all Events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('stadium');
        return res.status(200).json({ success: true, events });
    } catch (error) {
        console.error('Get events error:', error);
        return res.status(500).json({
            success: false,
            error: 'Get events error'
        });
    }
};

// Get single Event by ID
const getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate('stadium');
        return res.status(200).json({ success: true, event });
    } catch (error) {
        console.error('Get event error:', error);
        return res.status(500).json({
            success: false,
            error: 'Get event error'
        });
    }
};

// Update an Event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { eventName, eventDate, stadium, startTime, endTime } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { eventName, eventDate, stadium, startTime, endTime },
            { new: true }
        );

        return res.status(200).json({ success: true, updatedEvent });
    } catch (error) {
        console.error('Update event error:', error);
        return res.status(500).json({
            success: false,
            error: 'Update event error'
        });
    }
};

// Delete an Event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Delete event error:', error);
        return res.status(500).json({
            success: false,
            error: 'Delete event error'
        });
    }
};

export {
    addEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
};
