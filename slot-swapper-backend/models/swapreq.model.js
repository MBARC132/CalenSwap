import mongoose from "mongoose";

const swapReqSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User', 
        required:true
    },
    responder: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    myslot: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    theirSlot: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    status:{
        type: String,
        enum:["PENDING", "ACCEPTED", "REJECTED","CANCELLED"], 
        default:"PENDING"
    },
}, {timestamps:true});

const SwapReqModel = new mongoose.model("SwapRequest", swapReqSchema);
export default SwapReqModel;