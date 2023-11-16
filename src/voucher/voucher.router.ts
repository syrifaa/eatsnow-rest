import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as VoucherService from "./voucher.service";

export const voucherRouter = express.Router();

/**
 * GET: Get all vouchers
 * PATH: /api/voucher
 */
voucherRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const vouchers = await VoucherService.getAllVoucher();
        return res.status(200).json(vouchers);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

/**
 * GET: Get a voucher by id
 * PATH: /api/voucher/:id
 */
voucherRouter.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const voucher = await VoucherService.getVoucher(id);
        if (voucher !== null) {
            return res.status(200).json(voucher);
        }
        return res.status(404).json("Voucher not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

/**
 * POST: Create a voucher
 * PATH: /api/voucher
 * BODY: { title: string, desc: number }
 */
voucherRouter.post(
    "/", 
    body("title").isString(), 
    body("desc").isNumeric(), 
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const voucher = await VoucherService.createVoucher(req.body);
            return res.status(201).json(voucher);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
);

/**
 * PUT: Update a voucher by id
 * PATH: /api/voucher/:id
 * BODY: { title: string, desc: number }
 */
voucherRouter.put(
    "/:id", 
    body("title").isString(), 
    body("desc").isNumeric(), 
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const voucher = await VoucherService.updateVoucher(req.body, id);
            return res.status(200).json(voucher);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
);

/**
 * DELETE: Delete a voucher by id
 * PATH: /api/voucher/:id
 */
voucherRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        await VoucherService.deleteVoucher(id);
        return res.status(204).send();
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});