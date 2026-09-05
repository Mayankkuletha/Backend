import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
    {
        username :{
            type:String,
            required : true,
            unique :true,
            lowercase : true,
            index : true,
            trim: true
        },
        email:{
            type:String,
            required : true,
            unique :true,
            lowercase : true,
            trim : true
        },
        fullName:{
            type:String,
            required : true,
            lowercase : true,
            index : true,
            trim : true
        },
        avatar:{
            type:String, //Cloudinary Url
            required : true,
        },
        coverImage:{
            type:String,  //cloudinary Url
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref :"Video"
            }
            
        ],
        password:{
            type:String,
            required : [true,"Password is required"]
        },
        refreshToken : {
            type:String,
            required : true
        }

    },{
        timestamps:true
    }
)
//encrypting password
UserSchema.pre("save" , async function(next){

    if(!this.isModified("password")) return next();

    this.password = bcrypt(this.password,10);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password , this.password) //returns true or false
}

UserSchema.methods.generateAccessToken = function(){
   return jwt.sign(
        {
            _id : this._id,
            email :this.email,
            username : this.username,
            fullName : this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY 
        }
    )
}
UserSchema.methods.generateRefreshToken = function (){
     return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User" , UserSchema);