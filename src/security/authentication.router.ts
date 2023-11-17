import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getUser } from '../user/user.service';
import { accessValidation } from './authorization';


export const authRouter = express.Router();

/**
 * POST: Login a user
 * PATH: /api/login
 * BODY: { email: string, password: string }
 */
authRouter.post(
    "/", 
    body("email").isEmail(), 
    body("password").isString(), 
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        // check if there are any errors in the request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // check if user exists
        const user = await getUser(req.body.email);
        if (user === null) {
            return res.status(404).json("User not found");
        }

        // check if password is correct
        const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrectPassword) {
            return res.status(403).json("Incorrect password");
        }

        const payload = {
            email: user.email,
            username: user.username,
            profile_img: user.profile_img,
            points: user.points
        };

        const secret = process.env.JWT_SECRET!;

        const expiresIn = 60 * 2; // 2 minutes

        const token = jwt.sign(payload, secret, { expiresIn });

        return res.status(200).json({
            user: user,
            token: token,
        });
    }
);

/**
 * GET: Check if user is logged in
 * PATH: /api/login
 */
authRouter.get("/", accessValidation, async (req: Request, res: Response) => {
    req.body
    return res.status(200).json("User is logged in");
});

authRouter.delete("/", accessValidation, async (_req: Request, res: Response) => {
    localStorage.removeItem("token");
    return res.status(200).json("User is logged out");
});