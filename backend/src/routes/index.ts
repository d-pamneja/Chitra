// Importing the dependencies
import { Router } from "express";
import userRouter from "./user_routes.js";
import chatRouter from "./chat_routes.js";

// Creating the Router
const appRouter = Router();

// Setting the Middleware
appRouter.use("/user",userRouter); // If request to '/api/v2/user' is made via frontend, it will be handled by userRouter
appRouter.use("/chat",chatRouter); // If request to '/api/v2/chat' is made via frontend, it will be handled by chatRouter

// Exporting the router
export default appRouter;