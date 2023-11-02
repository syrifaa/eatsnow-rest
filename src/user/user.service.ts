import { db } from "../utils/db.server";

type User = {
    id: number,
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
export const listUser = async (): Promise<User[]> => {
    return db.user_premium.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            password: true,
            profile_img: true,
            points: true,
        }
    });
}

/**
 * Get a Premium User by id
 * @param id 
 * @returns 
 */
export const getUser = async (id: number): Promise<User | null> => {
    return db.user_premium.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
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
export const createUser = async (user: Omit<User, "id" | "points">): Promise<User> => {
    const { email, username, password, profile_img } = user;
    return db.user_premium.create({
        data: {
            email,
            username,
            password,
            profile_img,
        },
        select: {
            id: true,
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
export const updateUser = async (user: Omit<User, "id">, id: number): Promise<User> => {
    const { email, username, password, profile_img, points } = user;
    return db.user_premium.update({
        where: {
            id,
        },
        data: {
            email,
            username,
            password,
            profile_img,
            points,
        },
        select: {
            id: true,
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
export const deleteUser = async (id: number): Promise<void> => {
    await db.user_premium.delete({
        where: {
            id,
        },
    });
}

