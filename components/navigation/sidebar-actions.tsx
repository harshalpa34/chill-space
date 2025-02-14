"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { useModalStore } from "../../hooks/useModalStore";

const SidebarActions = () => {
  const { onOpen } = useModalStore();
  return (
    <div>
      <ActionTooltip label="Add a server" side="right" align="center">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className="flex-center mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus className="group-hover:text-white transition text-emerald-500" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default SidebarActions;
