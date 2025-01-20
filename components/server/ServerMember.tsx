"use client";

import { cn } from "../../lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import UserAvatar from "../UserAvatar";

interface ServerChannelProps {
  member: Member & { profile: Profile };
  role?: MemberRole;
  server?: Server;
}

const ServerMember = ({ member }: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <button
      className={cn(
        "group w-full p-2 flex font-semibold items-center  hover:text-zinc-300 hover:bg-zinc-700/50 text-[14px] cursor-pointer",
        params?.memberId === member.id
          ? "bg-zinc-700/50 text-zinc-100 hover:text-zinc-100 "
          : "text-zinc-400"
      )}
      onClick={() =>
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
      }
    >
      <UserAvatar src={member.profile.imageUrl} className="mr-2 h-9 w-9 md:h-8 md:w-8" />
      {member.profile.name}
    </button>
  );
};

export default ServerMember;
