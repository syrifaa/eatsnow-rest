import { db } from "../src/utils/db.server";

type User = {
    email: string;
    username: string;
    password: string;
    profile_img?: string;
};

type Voucher = {
    title: string;
    desc: string;
}

type UserVoucher = {
    user_id: number;
    voucher_id: number;
}

/**
 * This function will seed the database with some fake data.
 */
async function seed() {
    /* CREATE USER */
    await Promise.all(
        getUsers().map((user) => {
            const { email, username, password, profile_img } = user;
            return db.user_premium.upsert({
                where: {
                    email: email,
                },
                update: {
                    username: username,
                    password: password,
                    profile_img: profile_img ?? "profile_img.png",
                },
                create: {
                    email: email,
                    username: username,
                    password: password,
                    profile_img: profile_img ?? "profile_img.png",
                }
            });
        })
    );

    /* CREATE VOUCHER */
    await Promise.all(
        getVouchers().map((voucher) => {
            const { title, desc } = voucher;
            return db.voucher.upsert({
                where: {
                    title: title,
                },
                update: {
                    title: title,
                    desc: desc,
                },
                create: {
                    title: title,
                    desc: desc,
                }
            });
        }
    ));
    
    /* CREATE USER VOUCHER */
    const user1 = await db.user_premium.findFirst({
        where: {
            username: "Raven",
        },
    });

    const voucher1 = await db.voucher.findFirst({
        where: {
            title: "Voucher 1",
        },
    });

    const voucher2 = await db.voucher.findFirst({
        where: {
            title: "Voucher 2",
        },
    });

    if (!user1 || !voucher1 || !voucher2) {
        throw new Error("User not found");
    }

    await db.user_voucher.upsert({
        where: {
            user_id_voucher_id: { 
                user_id: user1.id, 
                voucher_id: voucher1.id 
            }
        },
        update: { user_id: user1.id, voucher_id: voucher1.id },
        create: { user_id: user1.id, voucher_id: voucher1.id },
    });
}

seed()

/**
 * Creating some fake users.
 * @returns Array of users
 */
function getUsers(): Array<User> {
    return [
        {
            email: "earlvonraven@gmail.com",
            username: "Raven",
            password: "password"

        },
        {
            email: "13521023@std.stei.itb.ac.id",
            username: "Kenny",
            password: "apaya"
        },
    ];
}

/**
 * Creating some fake vouchers.
 * @returns Array of vouchers
 */
function getVouchers(): Array<Voucher> {
    return [
        {
            title: "Voucher 1",
            desc: "This is the first voucher",
        },
        {
            title: "Voucher 2",
            desc: "This is the second voucher",
        },
    ]
}