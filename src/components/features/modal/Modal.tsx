"use client";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 h-fit w-fit">
        <div className="relative min-w-[300px] rounded-xl bg-background p-4 shadow-lg">
          <button
            type="button"
            onClick={onClose}
            className="group absolute top-4 right-4 flex cursor-pointer justify-self-end transition-colors"
          >
            <X
              size={28}
              className="stroke-text-primary transition-colors group-hover:stroke-secondary-accent"
            />
          </button>

          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
