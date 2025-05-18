import mongoose from 'mongoose';

const eventbookingSchema = new mongoose.Schema({
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
    user:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Eventbooking = mongoose.model("Eventbooking", eventbookingSchema);
export default Eventbooking;
