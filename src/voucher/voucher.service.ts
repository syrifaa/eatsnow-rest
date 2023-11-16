import { db } from "../utils/db.server";

/**
 * Voucher type
 * @property id
 * @property title
 * @property desc
 */
export type Voucher = {
    id: number;
    title: string;
    desc: number;
}

/**
 * Get all Voucher
 * @returns 
 */
export const getAllVoucher = async (): Promise<Voucher[]> => {
    return db.voucher.findMany({
        select: {
            id: true,
            title: true,
            desc: true,
        }
    });
}

/**
 * Get a Voucher by id
 * @param id
 * @returns 
 */
export const getVoucher = async (id: number): Promise<Voucher | null> => {
    return db.voucher.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            title: true,
            desc: true,
        }
    });
}

/**
 * Create a Voucher
 * @param voucher
 * @returns 
 */
export const createVoucher = async (voucher: Omit<Voucher, "id">): Promise<Voucher> => {
    const { title, desc } = voucher;
    return db.voucher.create({
        data: {
            title,
            desc,
        },
        select: {
            id: true,
            title: true,
            desc: true,
        }
    });
}

/**
 * Update a Voucher by id
 * @param voucher
 * @param id
 * @returns 
 */
export const updateVoucher = async (voucher: Voucher, id: number): Promise<Voucher> => {
    const { title, desc } = voucher;
    return db.voucher.update({
        where: {
            id,
        },
        data: {
            title,
            desc,
        },
        select: {
            id: true,
            title: true,
            desc: true,
        }
    });
}

/**
 * Delete a Voucher by id
 * @param id
 * @returns 
 */
export const deleteVoucher = async (id: number): Promise<void> => {
    await db.voucher.delete({
        where: {
            id,
        },
    });
}