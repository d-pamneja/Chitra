// Importing the dependencies
import { Router } from "express";

// Creating the Router
const appRouter = Router();

// Setting the Middleware
appRouter.use("/user");

// Exporting the router
export default appRouter;