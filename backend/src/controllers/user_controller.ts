// Importing the dependencies
import { NextFunction, Request, Response } from "express"
import user from "../models/user.js";
import {hash,compare} from "bcrypt";


// Fetching all the users from the database
export const getAllUsers = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    try {
        const users = await user.find();
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

export const userSignUp = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    try {
        const {name,email,password} = req.body;
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(401).json({
                message : "User with this email already exists."
            })
        }
        const hashedPassword = await hash(password,10); // Hash the password for safety of data
        const newUser = new user({name,email,password : hashedPassword});
        await newUser.save();

        return res.status(201).json({
            message : "New user registered",
            userID : newUser._id.toString()
        });
    } 
    catch (error) {
        console.log(`Error in creating new user : ${error.message}`);

        return res.status(500).json({
            message : "Error creating new user",
            reason : error.message
        })
    }
};

export const userLogIn = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    try {
        const {email,password} = req.body;

        const existingUser = await user.findOne({email});
        if(!existingUser){
            return res.status(401).json({
                message : "User with this email not found."
            })
        }

        const isPasswordCorrect = await compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(403).json({
                message : "Incorrect password. Please try again."
            })
        }

        return res.status(200).json({
            message : "User successfully logged in.",
            userID : existingUser._id.toString()
        });
    } 
    catch (error) {
        console.log(`Error in logging in user : ${error.message}`);

        return res.status(500).json({
            message : "Error in logging in user",
            reason : error.message
        })
    }
};


export default {getAllUsers,userSignUp};