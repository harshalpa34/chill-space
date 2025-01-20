import { currentProfile } from "../../../lib/current-profile";
import { db } from "../../../lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const message_limit = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("channel Id missing", { status: 404 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: message_limit,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        // take: message_limit,
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;
    if (messages.length === message_limit) {
      nextCursor = messages[message_limit - 1].id;
    }

    return NextResponse.json({ Items: messages, nextCursor });
  } catch (error) {
    console.log("[Messages Get]", error);
    return new NextResponse("internal Error ", { status: 500 });
  }
}
