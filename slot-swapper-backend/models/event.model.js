import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        requred:true
    },
    status:{
        type:String,
        enum: ["BUSY", "SWAPPABLE","SWAP_PENDING"],
        default:"BUSY"
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    required:true },
}, {timestamps:true});

const EventModel = mongoose.model('Event', eventSchema);
export default EventModel;