// Importing the dependencies
import mongoose from "mongoose";

// Defining the user model schema for MongoDB
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    conversations: [
        {
            date: {
                type: Date, default: Date.now, 
                required: true 
            },
            conversation: [
                {
                    user: { 
                        type: String, 
                        required: true 
                    },
                    chitra: { 
                        type: String, 
                        required: true 
                    },
                },
            ],
            feedback: String,
        }
    ]
});


// Exporting the model
export default mongoose.model("User",userSchema);


