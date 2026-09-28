import mongoose, { Schema }  from "mongoose"; 

const likeSchema = new mongoose.Schema({
    comment : {
        type : Schema.Types.ObjectId , 
        ref : "Comment"
    } ,
    video : {
        type :Schema.Types.ObjectId,
        ref : "Video"
    } ,
    likedBy : {
        type : Schema.Types.ObjectId,
        ref : "User"
    } ,
    tweets : {
        type: Schema.Types.ObjectId , 
        ref : "Tweet"
    }
},{timestamps:true});

export const Likes = mongoose.model("like" , likeSchema);