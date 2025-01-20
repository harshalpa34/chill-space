import { currentProfile } from "../../../lib/current-profile";
import { db } from "../../../lib/db";
import { Conversation, DirectMessage } from "@prisma/client";
import { NextResponse } from "next/server";

const message_limit = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const conversationId = searchParams.get("conversationId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("Conversation  missing", { status: 404 });
    }

    let directMessage: DirectMessage[] = [];

    if (cursor) {
      directMessage = await db.directMessage.findMany({
        // take: message_limit,
        // skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          conversationId: conversationId as string,
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
      directMessage = await db.directMessage.findMany({
        // take: message_limit,
        where: {
          conversationId: conversationId as string,
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
    if (directMessage.length === message_limit) {
      nextCursor = directMessage[message_limit - 1].id;
    }

    return NextResponse.json({ Items: directMessage, nextCursor });
  } catch (error) {
    console.log("[directMessage Get]", error);
    return new NextResponse("internal Error ", { status: 500 });
  }
}
