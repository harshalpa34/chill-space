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

const DeleteMessageModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const { apiUrl, query } = data;

  const open = isOpen && type === "deleteMessage";

  const onDeleteMessage = async () => {
    setIsLoading(true);
    try {
      const url = qs.stringifyUrl({ url: apiUrl || "", query });
      await axios.delete(url);
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white  p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold text-red-600">
            Delete Message
          </DialogTitle>
        </DialogHeader>

        <Label className="text-center">
          Are You Sure you want to this <br />
          the message will be permanently deleted
        </Label>
        <DialogFooter className="bg-[#2B2D31] px-6 py-4">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            size="sm"
            onClick={() => onDeleteMessage()}
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

export default DeleteMessageModal;
