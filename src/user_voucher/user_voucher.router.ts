import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as UserVoucherService from "./user_voucher.service";

export const uservoucherRouter = express.Router();

/**
 * GET: Get all user_vouchers
 * PATH: /api/user_voucher
 */
uservoucherRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const user_vouchers = await UserVoucherService.getAllUser_Voucher();
        return res.status(200).json(user_vouchers);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

/**
 * GET: Get all user_vouchers by user_id
 * PATH: /api/user_voucher/:user_id
 */
uservoucherRouter.get("/:user_id", async (req: Request, res: Response) => {
    const user_id = req.params.user_id;

    try {
        const user_vouchers = await UserVoucherService.getUser_Voucher(user_id);
        if (user_vouchers !== null) {
            return res.status(200).json(user_vouchers);
        }
        return res.status(404).json("User_Voucher not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

/**
 * GET: Get all user_vouchers by user_id and voucher_id
 * PATH: /api/user_voucher/:user_id/:voucher_id
 * BODY: { user_id: string, voucher_id: number, quantity: number }
 */
uservoucherRouter.get("/:user_id/:voucher_id", async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const voucher_id = Number(req.params.voucher_id);

    try {
        const user_voucher = await UserVoucherService.getUser_VoucherByUser_Voucher(user_id, voucher_id);
        if (user_voucher !== null) {
            return res.status(200).json(user_voucher);
        }
        return res.status(404).json("User_Voucher not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

/**
 * POST: Create a user_voucher
 * PATH: /api/user_voucher
 * BODY: { user_id: string, voucher_id: number, quantity: number }
 */
uservoucherRouter.post(
    "/", 
    body("user_id").isString(), 
    body("voucher_id").isNumeric(), 
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user_voucher = await UserVoucherService.createUser_Voucher(req.body);
            return res.status(201).json(user_voucher);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
);

/**
 * PUT: Update a user_voucher by user_id and voucher_id
 * PATH: /api/user_voucher/:user_id/:voucher_id
 * BODY: { user_id: string, voucher_id: number, quantity: number }
 */
uservoucherRouter.put(
    "/:user_id/:voucher_id", 
    body("quantity").isNumeric(), 
    async (req: Request, res: Response) => {
        const user_id = req.params.user_id;
        const voucher_id = Number(req.params.voucher_id);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user_voucher = await UserVoucherService.updateUser_Voucher(req.body, user_id, voucher_id);
            return res.status(200).json(user_voucher);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
);

/**
 * DELETE: Delete a user_voucher by user_id and voucher_id
 * PATH: /api/user_voucher/:user_id/:voucher_id
 */
uservoucherRouter.delete("/:user_id/:voucher_id", async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const voucher_id = Number(req.params.voucher_id);

    try {
        await UserVoucherService.deleteUser_Voucher(user_id, voucher_id);
        return res.status(204).json("User_Voucher deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

/**
 * PUT: Redeem a voucher by id
 * PATH: /api/user_voucher/redeem/:user_id/:voucher_id
 */
uservoucherRouter.put("/redeem/:user_id/:voucher_id", async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const voucher_id = Number(req.params.voucher_id);

    try {
        const user_voucher = await UserVoucherService.redeemVoucher(user_id, voucher_id);
        return res.status(200).json(user_voucher);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

/**
 * PUT: Use a voucher by id
 * PATH: /api/user_voucher/use/:user_id/:voucher_id
 */
uservoucherRouter.put("/use/:user_id/:voucher_id", async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const voucher_id = Number(req.params.voucher_id);

    try {
        const user_voucher = await UserVoucherService.useVoucher(user_id, voucher_id);
        return res.status(200).json(user_voucher);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});