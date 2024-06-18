"use client";

import { useSocket } from "./providers/SocketProvider";
import { Badge } from "./ui/badge";

const SocketIndication = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="bg-yellow-600 text-white border-none"
      >
        Failed to connect
      </Badge>
    );
  }

  return (
    <Badge
      variant={"outline"}
      className="bg-emerald-600 text-white border-none"
    >
      Live
    </Badge>
  );
};

export default SocketIndication;
