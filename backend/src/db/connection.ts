// Importing the dependencies
import {connect,disconnect} from "mongoose";

// Connecting to MongoDB
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to the MongoDB.");
    }
}

// Handling disconnection to MongoDB
async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect to the MongoDB.");
    }
}


// Exporting the function
export {connectToDatabase,disconnectFromDatabase};