import { Hash } from "lucide-react";
import MobileSidebarToggle from "../MobileSidebarToggle";
import UserAvatar from "../UserAvatar";
import SocketIndication from "../SocketIndication";
import ChatVideoButton from "./ChatVideoButton";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 h-12 flex items-center border-neutral-800 border-b-2">
      <MobileSidebarToggle serverId={serverId} />
      {type === "channel" && <Hash className="h-5 w-5 mr-2" />}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="mx-2 h-9 w-9 md:h-8 md:w-8" />
      )}
      <p className="font-semibold text-md">{name}</p>
      <div className="ml-auto flex-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndication />
      </div>
    </div>
  );
};

export default ChatHeader;
