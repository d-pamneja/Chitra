// Importing the dependencies
import { Router } from "express";
import { getAllUsers, userSignUp,userLogIn, verifyUser,userLogout} from "../controllers/user_controller.js";
import {loginValidator, signUpValidator, validate} from "../utils/validators.js"
import { verifyToken } from "../utils/token_manager.js";

// Initialising the user Router
const userRouter = Router();
 
// Setting the requests 
userRouter.get('/',getAllUsers) 
userRouter.post('/signup',validate(signUpValidator),userSignUp)
userRouter.post('/login',validate(loginValidator),userLogIn) 
userRouter.get('/auth-status',verifyToken,verifyUser) 
userRouter.get('/logout',verifyToken,userLogout)

// Exporting the user Router
export default userRouter;