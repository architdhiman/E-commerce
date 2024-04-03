import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
        type:mongoose.ObjectId,
        ref: "Products",
    },
    ],
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:"Users"
    },
    status:{
        type: String,
        default:"Not Process",
        enum:["Not Process", "Process", "Shippped","Canceled"]
    },    
    },
{timestamps:true})

export default mongoose.model('order', orderSchema)