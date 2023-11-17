import express from "express";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as RestaurantService from "./restaurant.service";

export const restaurantRouter = express.Router();

/**
 * GET: Get all restaurants
 * PATH: /api/restaurant
 */
restaurantRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users = await RestaurantService.getAllRestaurant();
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});