import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { UserData, ValidationRequest } from "../interface/interface";




/**
 * Validate for all users
 */
export const accessValidation = (req: Request, res: Response, next: NextFunction) => {
    const validateRequest = req as ValidationRequest;
    const { authorization } = validateRequest.headers;

    if (!authorization) {
        return res.status(401).json("Please insert token")
    }

    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET!;

    try {
        const decoded = jwt.verify(token, secret);

        if (typeof decoded !== "string") {
            validateRequest.userData = decoded as UserData;
        }
    } catch (error) {
        return res.status(403).json("You are not authorized");
    }

    next();
}

/**
 * Validate for specific user
 */
export const accessValidationUser = (req: Request, res: Response, next: NextFunction) => {
    const validationRequest = req as ValidationRequest;
    const { authorization } = validationRequest.headers;

    if (!authorization) {
        return res.status(401).json("Please insert token")
    }

    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET!;

    try {
        const decoded = jwt.verify(token, secret);

        if (typeof decoded !== "string") {
            validationRequest.userData = decoded as UserData;
        }

        if (validationRequest.userData.email !== req.params.email) {
            return res.status(403).json("You are not authorized");
        }


    } catch (error) {
        return res.status(401).json("You are not authorized");
    }

    next();
}

/**
 * Validate for admin with email: earlvonraven@gmail.com
 */
export const accessValidationAdmin = (req: Request, res: Response, next: NextFunction) => {
    const validationRequest = req as ValidationRequest;
    const { authorization } = validationRequest.headers;

    if (!authorization) {
        return res.status(401).json("Please insert token")
    }

    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET!;

    try {
        const decoded = jwt.verify(token, secret);

        if (typeof decoded !== "string") {
            validationRequest.userData = decoded as UserData;
        }

        if (validationRequest.userData.email !== "earlvonraven@gmail.com") {
            return res.status(403).json("You are not authorized");
        }
    } catch (error) {
        return res.status(401).json("You are not authorized");
    }

    next();
}


