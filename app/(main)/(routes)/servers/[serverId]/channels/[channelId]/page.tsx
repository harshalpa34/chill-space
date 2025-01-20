import MediaRoom from "../../../../../../../components/MediaRoom";
import ChatHeader from "../../../../../../../components/chat/ChatHeader";
import ChatInput from "../../../../../../../components/chat/ChatInput";
import ChatMessages from "../../../../../../../components/chat/ChatMessages";
import { currentProfile } from "../../../../../../../lib/current-profile";
import { db } from "../../../../../../../lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface props {
  params: { serverId: string; channelId: string };
}

const Page = async ({ params: { serverId, channelId } }: props) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-[#313338] flex flex-col h-full">
      <ChatHeader name={channel.name} serverId={serverId} type="channel" />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            name={channel.name}
            apiUrl={"/api/messages"}
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            socketUrl={"/api/socket/messages"}
            member={member}
            chatId={channel.id}
            paramKey={"channelId"}
            paramValue={channel.id}
            type={"channel"}
          />

          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{ channelId: channel.id, serverId: channel.serverId }}
          />
        </>
      )}

      {channel.type === ChannelType.AUDIO && (
        <MediaRoom video={false} audio={true} chatId={channel.id} />
      )}

      {channel.type === ChannelType.VIDEO && (
        <MediaRoom video={true} audio={false} chatId={channel.id} />
      )}
    </div>
  );
};

export default Page;
