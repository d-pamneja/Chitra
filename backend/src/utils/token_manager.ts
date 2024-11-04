// Importing the dependencies
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

// Initialising the token creation and verification function
export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    });
    return token;
};

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
      return res.status(403).json({ message: "User not authenticated"});
    }
    else{
      try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenData){
          res.locals.jwtData = tokenData
          return next()
        }
        else{
          return res.status(401).json({ message: "Token Invalid" });
        }
      }
      catch(error){
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
      }
    }
  };