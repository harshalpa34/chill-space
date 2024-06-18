"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole, Server } from "@prisma/client";
import ActionTooltip from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModalStore } from "@/hooks/useModalStore";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

interface serverSectionProps {
  sectionType: "channels" | "members";
  role: MemberRole | undefined;
  label: string;
  server?: Server;
  channelType?: ChannelType;
}

const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: serverSectionProps) => {
  const { onOpen } = useModalStore();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label={"Create Channel"} side="top">
          <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            onClick={() => onOpen("createChannel", { channelType })}
          >
            <Plus className="h-4 w-4 " />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label={"Manage User"} side="top">
          <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            onClick={() => onOpen("members", { server })}
          >
            <Settings className="h-4 w-4 " />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
