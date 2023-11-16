import { db } from "../utils/db.server";


/**
 * User type
 * @property email
 * @property username
 * @property password
 * @property profile_img
 * @property points
 */
export type User = {
    email: string;
    username: string;
    password: string;
    profile_img: string;
    points: number;
}

/**
 * Get all Premium User
 * @returns 
 */
export const getAllUser = async (): Promise<User[]> => {
    return db.user_premium.findMany({
        select: {
            email: true,
            username: true,
            password: true,
            profile_img: true,
            points: true,
        }
    });
}

/**
 * Get a Premium User by email
 * @param email 
 * @returns 
 */
export const getUser = async (email: string): Promise<User | null> => {
    return db.user_premium.findUnique({
        where: {
            email,
        },
        select: {
            email: true,
            username: true,
            password: true,
            profile_img: true,
            points: true,
        }
    });
}

/**
 * Create a Premium User
 * @param user
 * @returns 
 */
export const createUser = async (user: Omit<User, "points">): Promise<User> => {
    const { email, username, password, profile_img } = user;
    return db.user_premium.create({
        data: {
            email,
            username,
            password,
            profile_img,
        },
        select: {
            email: true,
            username: true,
            password: true,
            profile_img: true,
            points: true,
        }
    });
}

/**
 * Update a Premium User by id
 * @param user
 * @param id
 * @returns 
 */
export const updateUser = async (user: Omit<User, "points">, email_old: string): Promise<User> => {
    const { email, username, password, profile_img } = user;
    return db.user_premium.update({
        where: {
            email: email_old,
        },
        data: {
            email,
            username,
            password,
            profile_img,
        },
        select: {
            email: true,
            username: true,
            password: true,
            profile_img: true,
            points: true,
        }
    });
}

/**
 * Delete a Premium User by id
 * @param id
 * @returns 
 */
export const deleteUser = async (email: string): Promise<void> => {
    await db.user_premium.delete({
        where: {
            email,
        },
    });
}

