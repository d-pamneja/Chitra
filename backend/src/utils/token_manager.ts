// Importing the dependencies
import jwt from "jsonwebtoken";

// Initialising the token creation function
export const createToken = (
    id : string,
    email : string,
    expiresIn : string
) => {
    const payload = {id,email};
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn : expiresIn
    });

    return token;
}