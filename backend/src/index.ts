// Importing Required Dependencies
import { error } from "console";
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// Connecting the database and application
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
        app.listen(PORT,()=>console.log("Server opened and connected to MongoDB."));
    })
    .catch(err=>console.log(err))

