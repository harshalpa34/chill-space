"use client";

import { Channel, MemberRole, Server } from "@prisma/client";
import { iconMap } from "./ServerSidebar";
import { cn } from "../../lib/utils";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ActionTooltip from "../action-tooltip";
import { Edit, Trash } from "lucide-react";
import { useModalStore } from "../../hooks/useModalStore";

interface ServerChannelProps {
  channel: Channel;
  role?: MemberRole;
  server?: Server;
}

const ServerChannel = ({ channel, role, server }: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModalStore();

  return (
    <button
      className={cn(
        "group w-full p-2 flex font-semibold items-center  hover:text-zinc-300  text-[14px] cursor-pointer",
        params?.channelId === channel.id
          ? "bg-zinc-700/50 text-zinc-100 hover:text-zinc-100 "
          : "text-zinc-400 hover:bg-zinc-700/50"
      )}
      onClick={() =>
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
      }
    >
      {iconMap[channel.type]}
      <span className={"line-clamp-1"}>{channel.name} </span>

      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              className="hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300  transition"
              onClick={() => onOpen("editChannel", { channel })}
            />
          </ActionTooltip>

          <ActionTooltip label="Delete">
            <Trash
              className="hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300  transition"
              onClick={() => onOpen("deleteChannel", { channel })}
            />
          </ActionTooltip>
        </div>
      )}
    </button>
  );
};

export default ServerChannel;
