import MediaRoom from "../../../../../../../components/MediaRoom";
import ChatHeader from "../../../../../../../components/chat/ChatHeader";
import ChatInput from "../../../../../../../components/chat/ChatInput";
import ChatMessages from "../../../../../../../components/chat/ChatMessages";
import { getOrCreateConversation } from "../../../../../../../lib/conversations";
import { currentProfile } from "../../../../../../../lib/current-profile";
import { db } from "../../../../../../../lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface props {
  params: { serverId: string; memberId: string };
  searchParams: { video?: boolean };
}

const page = async ({
  params: { serverId, memberId },
  searchParams,
}: props) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMemeber = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });
  if (!currentMemeber) {
    return;
  }

  const conversation = await getOrCreateConversation(
    currentMemeber.id,
    memberId
  );

  if (!conversation) {
    return redirect(`/servers/${serverId}`);
  }

  const { memberOne, memberTwo } = conversation;
  const otherMember =
    profile.id === memberOne.profileId ? memberTwo : memberOne;
  return (
    <div className="bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={serverId}
        name={otherMember?.profile.name}
        type="conversation"
        imageUrl={otherMember.profile.imageUrl}
      />
      {searchParams.video && (
        <MediaRoom chatId={conversation.id} video={true} audio={false} />
      )}

      {!searchParams.video && (
        <>
          <ChatMessages
            name={otherMember?.profile.name}
            apiUrl={"/api/direct-messages"}
            socketQuery={{
              conversationId: conversation.id,
            }}
            socketUrl={"/api/socket/direct-messages"}
            member={currentMemeber}
            chatId={conversation.id}
            paramKey={"conversationId"}
            paramValue={conversation.id}
            type={"conversation"}
          />

          <ChatInput
            name={otherMember.profile.name}
            apiUrl="/api/socket/direct-messages"
            query={{ conversationId: conversation.id }}
            type="conversation"
          />
        </>
      )}
    </div>
  );
};

export default page;
