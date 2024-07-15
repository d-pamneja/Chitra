// Importing the dependencies
import { NextFunction, Request, Response } from "express"
import user from "../models/user.js";


// Fetching all the users from the database
export const getAllUsers = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    try {
        console.log("Fetching all users")
        const users = await user.find();
        console.log("Users fetched:", users)
        return res.status(200).json({
            message : "All users fetched",
            users
        })
    } 
    catch (error) {
        console.log(`Error fetching all users due to ${error.message}`);

        return res.status(500).json({
            message : "Error fetching all users",
            reason : error.message
        })
    }
};

export default getAllUsers;