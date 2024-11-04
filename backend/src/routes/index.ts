// Importing the dependencies
import { Router } from "express";
import userRouter from "./user_routes.js";
import chatRouter from "./chat_routes.js";

// Creating the Router
const appRouter = Router();


// Setting the Middleware
appRouter.use("/user",userRouter); 
appRouter.use("/chat",chatRouter);

// Exporting the router
export default appRouter;