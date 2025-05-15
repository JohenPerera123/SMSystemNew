import mongoose from 'mongoose';

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
    seatNumber: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
