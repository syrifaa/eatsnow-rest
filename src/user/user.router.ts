import express from "express";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as UserService from "./user.service";

export const userRouter = express.Router();

/**
 * GET: Get all users
 * PATH: /api/user
 */
userRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUser();
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

/**
 * GET: Get a user by email
 * PATH: /api/user/:email
 */
userRouter.get("/:email", async (req: Request, res: Response) => {
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
});

/**
 * POST: Create a user
 * PATH: /api/user
 * BODY: { email: string, username: string, password: string, profile_img?: string }
 */
userRouter.post(
    "/", 
    body("email").isEmail(), 
    body("username").isString(), 
    body("password").isString(), 
    body("profile_img").optional().isString(), 
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
 * PUT: Update a user by email for all attributes
 * PATH: /api/user/:email
 * BODY: { email: string, username: string, password: string, profile_img: string, points: number }
 */
userRouter.put(
    "/:email", 
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
);

/**
 * DELETE: Delete a user
 * PATH: /api/user/:email
 */
userRouter.delete("/:email", async (req: Request, res: Response) => {
    const email = req.params.email
    try {
        await UserService.deleteUser(email);
        return res.status(204).send("User has been successfully deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});