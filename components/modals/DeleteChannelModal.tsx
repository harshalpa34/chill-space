"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { useModalStore } from "../../hooks/useModalStore";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const DeleteChannelModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { channel } = data;

  const open = isOpen && type === "deleteChannel";

  const onDeleteChannel = async () => {
    if (channel) {
      try {
        setIsLoading(true);
        await axios.delete(
          `/api/server/${params?.serverId}/channel/${channel.id}`
        );
        onClose();
        router.refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white  p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold text-red-600">
            Delete Channel
          </DialogTitle>
        </DialogHeader>

        <Label className="text-center">
          Are You Sure you want to DELETE{" "}
          <span className="text-red-600"> {channel?.name} </span> channel ?
        </Label>
        <DialogFooter className="bg-[#2B2D31] px-6 py-4">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            size="sm"
            onClick={() => onDeleteChannel()}
            className="w-[100px]"
          >
            {isLoading ? (
              <Loader2 className="animate-spin text-zinc-300 w-4 h04 m-auto" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
