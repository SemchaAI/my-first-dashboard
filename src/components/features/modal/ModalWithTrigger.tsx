"use client";
import { useState } from "react";
import Modal from "./Modal";
import { useScrollControl } from "@/utils/hooks";

interface ModalTriggerProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

export const ModalWithTrigger = ({ button, children }: ModalTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useScrollControl(isOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div onClick={handleOpen} className="inline-block cursor-pointer">
        {button}
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        {children}
      </Modal>
    </>
  );
};
