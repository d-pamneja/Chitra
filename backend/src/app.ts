console.log(
    "This is V0.0.2 of the Chitra Movie Bot, made by Dhruv Pamneja."
); 

// Importing Required Dependencies
import express from "express";
import {config} from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

// Creating Express application
config();
const app = express();

// Initialising the Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev")); // This needs to be removed when in production mode
app.use('/api/v2',appRouter)

// Export the app
export default app;