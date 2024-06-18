"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

interface SearchCommandMenuProps {
  data: {
    label: string;
    type: "member" | "channel";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchCommandMenu: React.FC<SearchCommandMenuProps> = ({
  data,
  open,
  setOpen,
}) => {
  const router = useRouter();
  const params = useParams();
  const commandRedirectHandler = ({
    id,
    type,
  }: {
    id: string;
    type: "member" | "channel";
  }) => {
    if (type === "member") {
      router.push(`/servers/${params.serverId}/conversations/${id}`);
    }
    if (type === "channel") {
      router.push(`/servers/${params.serverId}/channels/${id}`);
    }

    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        className="bg-[#1E1F22] text-[#DBDEE1] py-1 px-2 rounded-md "
      />
      <CommandList className="bg-[#313338] text-white">
        <CommandEmpty>No results found.</CommandEmpty>
        {data &&
          data.map(({ label, data, type }) => {
            if (data.length === 0) {
              return null;
            }
            return (
              <CommandGroup heading={label} key={label}>
                {data.map(({ id, icon, name }) => (
                  <CommandItem
                    key={id}
                    className="cursor-pointer"
                    onSelect={(e) => commandRedirectHandler({ id, type })}
                  >
                    {icon}
                    <span>{name} </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommandMenu;
