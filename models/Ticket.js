import mongoose from 'mongoose';
import Event from './Event.js';
import Stadium from './Stadium.js';

// Helper function to generate seat numbers
let seatCounter = 1;
function generateSeatNumber() {
    return `S-${seatCounter++}`;
}

const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    stadiumName: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    availableSeat: {
        type: Number,
        required: true,
    },
    seatNumber: {
        type: String,
        default: generateSeatNumber,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
