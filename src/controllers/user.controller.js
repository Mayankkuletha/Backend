import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadCloudinary} from "../utils/cloudinary.js";
import { API_response } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req,res)=>{
    //get user details from user
    //check for validations -- not empty 
    //check if the user already exits :username , email
    //check for images , check for avatar
    // upload them to cloudinary , check for avatar upload at cloudinary 
    //create user object - create entry in db
    //remove password and refresh token feilds from responses.
    //check from user creation
    //return res

    const {fullName , email ,username  , password} = req.body ;
    // console.log("email:" , email);
    //validation
    if (
        [fullName,email,username,password].some((feild)=>feild?.trim()==="")
    ) {
        throw new ApiError(404,"All feilds are required")
    }
    //check for already exist
    const existedUSer = await User.findOne({
        $or:[{username}, {email}]
       })

    if(existedUSer){
        throw new ApiError(409 , "User with email or password already exists")
    }

    //files upload 
   const avatarLocalPath = req.files?.avatar[0]?.path;
//    const coverImageLocalPath = req.files?.coverImage[0]?.path;   

let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
    coverImageLocalPath = req.files.coverImage[0].path;
}
    //we will require avatar path 
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }

    //upload on cloudinary
    const avatar = await uploadCloudinary(avatarLocalPath);
    const coverImage = await uploadCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }

    //creating user object
    const user =  await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase(),
    })
    //checking if user is created successfully or not by id concept because mongoDb defulty associate id to object created itself

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!userCreated){
        throw new ApiError (500,"Something when wrong while registering the error")
    }

    //lets return response
    return res.status(201).json(
        new API_response(200,userCreated,"User registered sucessfully")
    )

} )

export{registerUser}