import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextApiRequest } from "next";

export const currentProfileServer = async (req: NextApiRequest) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return null;
    }
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });
    return profile;
  } catch (err) {
    return null;
  }
};
