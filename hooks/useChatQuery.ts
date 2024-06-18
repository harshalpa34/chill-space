"use client";

import { useSocket } from "@/components/providers/SocketProvider";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "query-string";

interface Props {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

const useChatQuery = ({ paramKey, apiUrl, paramValue, queryKey }: Props) => {
  const { isConnected } = useSocket();
  const getMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: { cursor: pageParam, [paramKey]: paramValue },
      },
      { skipNull: true, skipEmptyString: true }
    );

    const resp = await axios.get(url);
    return resp.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: getMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
      initialPageParam: undefined,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};

export default useChatQuery;
