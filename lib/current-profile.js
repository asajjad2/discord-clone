import { auth } from "@clerk/nextjs";
import db from "./db";

export const currentProfile = async () => {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    return await db.profile.findUnique({
        where: {
        userID : userId,
        },
    });
};