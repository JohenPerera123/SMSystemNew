import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    stadium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stadium',
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
    ticketsBooked: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
