import express from "express";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UserService from "./user.service";
import { accessValidation, accessValidationUser, accessValidationAdmin, getEmail } from '../security/authorization';


export const userRouter = express.Router();

/**
 * PATH: /api/user
 * GET: Get all users
 * POST: Create a user
 *   BODY: { email: string, username: string, password: string, profile_img?: string }
 */
userRouter.route("/")
    .get(accessValidationAdmin, async (_req: Request, res: Response) => {
        try {
            const users = await UserService.getAllUser();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    })
    .post(
        body("email").isEmail(), 
        body("username").isString(), 
        body("password").isString(), 
        body("profile_img").isString(), 
        async (req: Request, res: Response) => {
            const errors = validationResult(req);

            // check if there are any errors in the request
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // check if user already exists
            const user = await UserService.getUser(req.body.email);
            if (user !== null) {
                return res.status(409).json("User already exists");
            }

            try {
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                req.body.password = hashedPassword;
                const user = await UserService.createUser(req.body);
                return res.status(201).send(user);
            } catch (error: any) {
                return res.status(500).send(error.message);
            }
        }
    );

/**
 * PATH: /api/user/:email
 * GET: Get a user by email
 * PUT: Update a user by email for all attributes
 *   BODY: { email: string, username: string, password: string, profile_img: string, points: number }
 * DELETE: Delete a user
 */
userRouter.route("/:email")
    .get(accessValidationUser, async (req: Request, res: Response) => {
        const email = req.params.email;

        try {
            const user = await UserService.getUser(email);
            if (user !== null) {
                return res.status(200).json(user);
            }
            return res.status(404).json("User not found");
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    })
    .put(
        body("email").isEmail(), 
        body("username").isString(), 
        body("password").isString(), 
        body("profile_img").isString(), 
        async (req: Request, res: Response) => {
            const email_old = req.params.email;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // check if user exists
            const user = await UserService.getUser(email_old);
            if (user === null) {
                return res.status(404).json("User not found");
            }
            try {
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                req.body.password = hashedPassword;
                const user = await UserService.updateUser(req.body, email_old);
                return res.status(200).json(user);
            } catch (error: any) {
                return res.status(500).json(error.message);
            }
        }
    )
    .delete(async (req: Request, res: Response) => {
        const email = req.params.email
        try {
            await UserService.deleteUser(email);
            return res.status(204).send("User has been successfully deleted");
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    });
userRouter.route("/points/:email")
.put(
    body("points").isNumeric(),
    async (req: Request, res: Response) => {
        const email = req.params.email;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await UserService.getUser(email);
            if (user === null) {
                return res.status(404).json("User not found");
            }
            const points = req.body.points;
            await UserService.updatePoints(email, points);
            return res.status(200).json("Points updated");
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
)
.get(accessValidationUser, async (req: Request, res: Response) => {
    const email = req.params.email;
    // use getPoints
    try {
        const user = await UserService.getUser(email);
        if (user === null) {
            return res.status(404).json("User not found");
        }
        const points = await UserService.getPoints(email);
        return res.status(200).json(points);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
})
;