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
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

const LeaveServerModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { server } = data;

  const open = isOpen && type === "leaveServer";

  const onLeaveServerClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/server/${server?.id}/leave-server`,
      });
      await axios.patch(url);
      router.refresh();
      onClose();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white  p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold text-red-600">
            Leave Server
          </DialogTitle>
        </DialogHeader>

        <Label className="text-center">
          Are You Sure you want to leave <span className="text-red-600"> {server?.name} </span> ?
        </Label>
        <DialogFooter className="bg-[#2B2D31] px-6 py-4">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            size="sm"
            onClick={() => onLeaveServerClick()}
            className="w-[100px]"
          >
            {isLoading ? (
              <Loader2 className="animate-spin text-zinc-300 w-4 h04 m-auto" />
            ) : (
              "Leave Server"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
