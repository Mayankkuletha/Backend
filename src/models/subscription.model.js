import mongoose, { Schema, Types } from "mongoose";

const subsscriptionSchema = new mongoose.Schema(
    {
        subscriber:{
            type: Schema.Types.ObjectId, //one who is subscribing
            ref : "User"
        },
        channel:{
            type:Schema.Types.ObjectId, //one to whom subscriber is subscribing
            ref : "User"
        }
    }
    ,{timestamps:true});

export const subscription =  mongoose.model("subscription" , subsscriptionSchema);