// Importing the dependencies
import { Router } from "express";
import { getAllUsers } from "../controllers/user_controller.js";

// Initialising the user Router
const userRouter = Router();

// Setting the requests 
userRouter.get('/',getAllUsers) // If a request is made to userRouter without any id, it will get all users

// Exporting the user Router
export default userRouter;