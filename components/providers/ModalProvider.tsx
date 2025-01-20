"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../../components/modals/CreateServerModal";
import InviteModal from "../../components/modals/InviteModal";
import EditServerModal from "../../components/modals/EditServerModal";
import MembersModal from "../../components/modals/MembersModal";
import CreateChannelModal from "../modals/CreateChannelModal";
import LeaveServerModal from "../modals/LeaveServerModal";
import DeleteServerModal from "../modals/DeleteServerModal";
import DeleteChannelModal from "../modals/DeleteChannelModal";
import EditChannelModal from "../modals/EditChannelModal";
import MessageModalModal from "../modals/MessageFileModal";
import DeleteMessageModal from "../modals/DeleteMessageModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageModalModal />
      <DeleteMessageModal />
    </>
  );
};
