"use client";
import { useSocket } from "../components/providers/SocketProvider";
import { Member, Profile } from "@prisma/client";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type socketProps = {
  addkey: string;
  updateKey: string;
  queryKey: string;
};

type MessageWithMemberWithProfile = Member & {
  member: Member & {
    profile: Profile;
  };
};

const useChatSocket = ({ addkey, updateKey, queryKey }: socketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
      // @ts-ignore comment
      queryClient.setQueriesData<QueryKey>([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            Items: page.Items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            }),
          };
        });

        return { ...oldData, pages: newData };
      });
    });

    socket.on(addkey, (message: MessageWithMemberWithProfile) => {
      // @ts-ignore comment
      queryClient.setQueriesData<QueryKey>([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{ Items: [message] }],
          };
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          Items: [message, ...newData[0].Items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addkey);
      socket.off(updateKey);
    };
  }, [queryClient, addkey, queryKey, socket, updateKey]);
};

export default useChatSocket;
