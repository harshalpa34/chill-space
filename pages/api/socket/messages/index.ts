import { currentProfileServer } from "../../../../lib/current-profile-server";
import { db } from "../../../../lib/db";
import { NextApiResponseServerIo } from "../../../../types";
import { NextApiRequest } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const profile = await currentProfileServer(req);
    const { content, fileUrl } = req.body;
    const { channelId, serverId } = req.query;

    if (!profile) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!channelId) {
      return res.status(400).json({ message: "Channel Id Missing" });
    }

    if (!serverId) {
      return res.status(400).json({ message: "Server Id Missing" });
    }

    if (!content) {
      return res.status(400).json({ message: "Content Id Missing" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ message: "Server Not Found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel Not Found" });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );
    if (!member) {
      return res.status(404).json({ message: "Member Not Found" });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
