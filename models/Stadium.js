import mongoose from 'mongoose';

const stadiumSchema = new mongoose.Schema({
    Std_name: {
        type: String,
        required: true,
    },
    Std_location: {
        type: String,
        required: true,
    },
    Std_capacity: {
        type: Number,
        required: true,
    },
    resourceres: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const Stadium = mongoose.model("Stadium", stadiumSchema)
export default Stadium;