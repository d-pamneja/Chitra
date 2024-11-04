// Importing the dependencies
import { NextFunction, Request, Response } from "express"
import user from "../models/user.js";
import {hash,compare} from "bcrypt";
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";


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

        const oldToken = req.signedCookies[`${COOKIE_NAME}`]; // Read the current cookie
        if (oldToken) {
            res.clearCookie(COOKIE_NAME);
        }
    
        const token = createToken(newUser._id.toString(), newUser.email, "7d");
        const expiresInMilliseconds = 7 * 24 * 60 * 60 * 1000; 
        const expires = new Date(Date.now() + expiresInMilliseconds);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires : expires,
            httpOnly: true,
            signed: true,
            secure : true
        });

        return res.status(201).json({
            message : "New user registered",
            name : newUser.name,
            email : newUser.email
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

        const oldToken = req.signedCookies[`${COOKIE_NAME}`]; // Read the current cookie
        if (oldToken) {
            res.clearCookie(COOKIE_NAME);
        }
    
        const token = createToken(existingUser._id.toString(), existingUser.email, "7d");
        const expiresInMilliseconds = 7 * 24 * 60 * 60 * 1000; 
        const expires = new Date(Date.now() + expiresInMilliseconds);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            secure : true
        });

        return res.status(200).json({
            message : "User successfully logged in.",
            name : existingUser.name,
            email : existingUser.email
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

export const verifyUser = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    try {
        if(!res.locals.jwtData){
            return res.status(403).json({message : "Invalid authorisation"})
        }
        
        const existingUser = await user.findById(res.locals.jwtData.id);
        if(!existingUser){
            return res.status(401).json({
                message : "User not registered or Token malfunctioned."
            })
        }
        console.log(existingUser._id.toString(),res.locals.jwtData.id);

        if(existingUser._id.toString() != res.locals.jwtData.id){
            return res.status(401).send("Permissions did not match.");
        }

        return res.status(200).json({
            message : "User successfully logged in.",
            name : existingUser.name,
            email : existingUser.email
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

export const userLogout = async (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    try {
        res.clearCookie(COOKIE_NAME);
        return res.status(200).json({
            message : "User successfully logged out."
        });
    } 
    catch (error) {
        console.log(`Error in logging out user : ${error.message}`);

        return res.status(500).json({
            message : "Error in logging in user",
            reason : error.message
        })
    }
};


export default {getAllUsers,userSignUp,userLogIn,verifyUser,userLogout};