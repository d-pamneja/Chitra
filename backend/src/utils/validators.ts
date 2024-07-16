// Importing the dependencies
import { NextFunction, Request, Response} from "express";
import { ValidationChain, body, validationResult } from "express-validator";

// Validation function to check multiple validations
export const validate = (validations: ValidationChain[]) => {
    return async (
        req : Request,
        res : Response,
        next : NextFunction
    ) => {
        for(let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }

        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        
        return res.status(422).json({errors : errors.array()})
    }

};

// Creating sign up validator
export const signUpValidator = [
    body("name").notEmpty().withMessage("Name cannot be empty"),
    body("email").trim().isEmail().withMessage("Email is required in valid format"),
    body("password").trim().isLength({min:6}).withMessage("Password has to be atleast 6 characters")
]
