import { db } from "../utils/db.server";
import { getUser } from "../user/user.service";
import { getVoucher } from "../voucher/voucher.service";

/**
 * User_Voucher type
 * @property id
 * @property title
 * @property desc
 */
export type User_Voucher = {
    user_id: string;
    voucher_id: number;
    quantity: number;
}

/**
 * Get all User_Voucher
 * @returns 
 */
export const getAllUser_Voucher = async (): Promise<User_Voucher[]> => {
    return db.user_voucher.findMany({
        select: {
            user_id: true,
            voucher_id: true,
            quantity: true,
        }
    });
}

/**
 * Get all User_Voucher by user_id
 * @param user_id
 * @returns 
 */
export const getUser_Voucher = async (user_id: string): Promise<User_Voucher[]> => {
    return db.user_voucher.findMany({
        where: {
            user_id,
        },
        select: {
            user_id: true,
            voucher_id: true,
            quantity: true,
        }
    });
}

/**
 * Get User_Voucher by user_id and voucher_id
 * @param user_id
 * @param voucher_id
 * @returns
*/
export const getUser_VoucherByUser_Voucher = async (user_id: string, voucher_id: number): Promise<User_Voucher | null> => {
    return db.user_voucher.findUnique({
        where: {
            user_id_voucher_id: {
                user_id,
                voucher_id,
            }
        },
        select: {
            user_id: true,
            voucher_id: true,
            quantity: true,
        }
    });
}

/**
 * Create a User_Voucher
 * @param user_voucher
 * @returns 
 */
export const createUser_Voucher = async (user_voucher: Omit<User_Voucher, "quantity">): Promise<User_Voucher> => {
    const { user_id, voucher_id } = user_voucher;
    return db.user_voucher.create({
        data: {
            user_id,
            voucher_id,
            quantity: 1,
        },
        select: {
            user_id: true,
            voucher_id: true,
            quantity: true,
        }
    });
}

/**
 * Update a User_Voucher by user_id and voucher_id
 * @param user_voucher
 * @param user_id
 * @param voucher_id
 * @returns
*/
export const updateUser_Voucher = async (user_voucher: Pick<User_Voucher, "quantity">, user_id: string, voucher_id: number): Promise<User_Voucher | null> => {
    const { quantity } = user_voucher;
    return db.user_voucher.update({
        where: {
            user_id_voucher_id: {
                user_id,
                voucher_id,
            }
        },
        data: {
            quantity,
        },
        select: {
            user_id: true,
            voucher_id: true,
            quantity: true,
        }
    });
}

/**
 * Delete a User_Voucher by user_id and voucher_id
 * @param user_id
 * @param voucher_id
 * @returns
*/
export const deleteUser_Voucher = async (user_id: string, voucher_id: number): Promise<User_Voucher | null> => {
    return db.user_voucher.delete({
        where: {
            user_id_voucher_id: {
                user_id,
                voucher_id,
            }
        },
        select: {
            user_id: true,
            voucher_id: true,
            quantity: true,
        }
    });
}

/**
 * Redeem a Voucher by email and points from Premium User with check if points are enough
 * If points are enough, the points will be reduced by desc voucher
 * Before redeeming, check if voucher and user exist in user_voucher
 * If voucher and user exist, quantity will be increased by 1
 * @param id
 * @param email
 */
export const redeemVoucher = async (email: string, id: number): Promise<void> => {
    const voucher = await getVoucher(id);
    const user = await getUser(email);
    if (voucher && user) {
        if (user.points >= voucher.desc) {
            await db.user_premium.update({
                where: {
                    email,
                },
                data: {
                    points: user.points - voucher.desc,
                },
            });
            const user_voucher = await getUser_VoucherByUser_Voucher(user.email, voucher.id);
            if (user_voucher) {
                await updateUser_Voucher({ quantity: user_voucher.quantity + 1 }, user.email, voucher.id);
            } else {
                await createUser_Voucher({ user_id: user.email, voucher_id: voucher.id });
            }
        } else {
            throw new Error("Not enough points");
        }
    } else {
        throw new Error("Voucher or User not found");
    }
}

/**
 * Use a Voucher by email from Premium User and id from Voucher
 * Quantity will be reduced by 1
 * If quantity is 0, user_voucher will be deleted
 * @param user_voucher
 * @param user_id
 * @param voucher_id
*/
export const useVoucher = async (email: string, id: number): Promise<void> => {
    const voucher = await getVoucher(id);
    const user = await getUser(email);
    if (voucher && user) {
        const user_voucher = await getUser_VoucherByUser_Voucher(user.email, voucher.id);
        if (user_voucher) {
            if (user_voucher.quantity > 1) {
                await updateUser_Voucher({ quantity: user_voucher.quantity - 1 }, user.email, voucher.id);
            } else {
                await deleteUser_Voucher(user.email, voucher.id);
            }
        } else {
            throw new Error("Voucher not found");
        }
    } else {
        throw new Error("Voucher or User not found");
    }
}