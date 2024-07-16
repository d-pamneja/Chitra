// Importing the dependencies
import { Router } from "express";
import { getAllUsers, userSignUp} from "../controllers/user_controller.js";
import {signUpValidator, validate} from "../utils/validators.js"

// Initialising the user Router
const userRouter = Router();

// Setting the requests 
userRouter.get('/',getAllUsers) // If a request is made to userRouter without any id, it will get all users
userRouter.post('/signup',validate(signUpValidator),userSignUp) // If a request is sent here with user data, new user will be created if it does not exist


// Exporting the user Router
export default userRouter;