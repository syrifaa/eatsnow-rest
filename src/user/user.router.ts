import express from "express";
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
        const users = await UserService.listUser();
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

/**
 * GET: Get a user by id
 * PATH: /api/user/:id
 */
userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const user = await UserService.getUser(id);
        if (user) {
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
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await UserService.createUser(req.body);
            return res.status(201).send(user);
        } catch (error: any) {
            return res.status(500).send(error.message);
        }
    }
);

/**
 * PUT: Update a user by id for all attributes
 * PATH: /api/user/:id
 * BODY: { email: string, username: string, password: string, profile_img: string, points: number }
 */
userRouter.put(
    "/:id", 
    body("email").isEmail(), 
    body("username").isString(), 
    body("password").isString(), 
    body("profile_img").isString(), 
    body("points").isNumeric(),
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await UserService.updateUser(req.body, id);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
);

/**
 * PATCH: Update a user by id for some attributes
 * PATH: /api/user/:id
 * BODY: { email?: string, username?: string, password?: string, profile_img?: string, points?: number }
 */
userRouter.patch(
    "/:id", 
    body("email").optional().isEmail(), 
    body("username").optional().isString(), 
    body("password").optional().isString(), 
    body("profile_img").optional().isString(), 
    body("points").optional().isNumeric(),
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await UserService.updateUser(req.body, id);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
);

/**
 * DELETE: Delete a user
 * PATH: /api/user/:id
 */
userRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        await UserService.deleteUser(id);
        return res.status(204).send("User has been successfully deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});