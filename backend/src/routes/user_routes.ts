// Importing the dependencies
import { Router } from "express";
import { getAllUsers, userSignUp,userLogIn, verifyUser} from "../controllers/user_controller.js";
import {loginValidator, signUpValidator, validate} from "../utils/validators.js"
import { verifyToken } from "../utils/token_manager.js";

// Initialising the user Router
const userRouter = Router();
 
// Setting the requests 
userRouter.get('/',getAllUsers) // If a request is made to userRouter without any id, it will get all users
userRouter.post('/signup',validate(signUpValidator),userSignUp) // If a request is sent here with user data, new user will be created if it does not exist
userRouter.post('/login',validate(loginValidator),userLogIn) // If a request is sent here with user data and is validated, user will be logged in the application
userRouter.get('/auth-status',verifyToken,verifyUser) // If a request is sent here, the user's authentication status will be checked based on which the user will be redirected to the appropriate page


// Exporting the user Router
export default userRouter;