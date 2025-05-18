import Event from '../models/Event.js';
import Eventbooking from '../models/Eventbooking.js';

// Add a new Event
const addEventbooking = async (req, res) => {
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
    const existingEventbooking = await Eventbooking.findOne({
            stadium,
            eventDate,
            startTime,
            endTime
        });

        if (existingEventbooking) {
            return res.status(400).json({
                success: false,
                error: 'An event with the same stadium, date, and time already exists.'
            });
        }

        const overlappingEventbooking = await Eventbooking.findOne({
      stadium,
      eventDate,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (overlappingEventbooking) {
      return res.status(400).json({
        success: false,
        error: 'An overlapping event already exists for this stadium, date, and time range.'
      });
    }    
    
    // const { eventName, eventDate, stadium, startTime, endTime } = req.body;

        const newEventbooking = new Eventbooking({
            eventName,
            eventDate,
            stadium,
            startTime,
            endTime,
            user: req.username._id
        });

        await newEventbooking.save();

        return res.status(200).json({ success: true, event: newEventbooking });
    } catch (error) {
        console.error('Add event error:', error);
        return res.status(500).json({
            success: false,
            error: 'Add event error'
        });
    }
};

// Get all Events
const getEventsbooking = async (req, res) => {
    try {
        const eventsbooking = await Eventbooking.find({user: req.username._id}).populate('stadium');
        return res.status(200).json({ success: true, eventsbooking });
    } catch (error) {
        console.error('Get events error:', error);
        return res.status(500).json({
            success: false,
            error: 'Get events error'
        });
    }
};

// Get single Event by ID
const getEventbooking = async (req, res) => {
    try {
        const { id } = req.params;
        const eventbooking = await Eventbooking.findById(id).populate('stadium');
        return res.status(200).json({ success: true, eventbooking });
    } catch (error) {
        console.error('Get event error:', error);
        return res.status(500).json({
            success: false,
            error: 'Get event error'
        });
    }
};

// Update an Event
const updateEventbooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { eventName, eventDate, stadium, startTime, endTime } = req.body;

        const updatedEventbooking = await Eventbooking.findByIdAndUpdate(
            id,
            { eventName, eventDate, stadium, startTime, endTime },
            { new: true }
        );

        return res.status(200).json({ success: true, updatedEventbooking });
    } catch (error) {
        console.error('Update event error:', error);
        return res.status(500).json({
            success: false,
            error: 'Update event error'
        });
    }
};

// Delete an Event
const deleteEventbooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Eventbooking.findByIdAndDelete(id);
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
    addEventbooking,
    getEventsbooking,
    getEventbooking,
    updateEventbooking,
    deleteEventbooking
};
