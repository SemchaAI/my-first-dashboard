"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

import { useScrollControl } from "@/utils/hooks";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: IProps) => {
  useScrollControl(isOpen);
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
      <div
        role="dialog"
        className="relative z-10 h-fit max-h-[80dvh] w-fit min-w-[320px] animate-modal rounded-xl bg-background p-4 pt-8 shadow-lg"
      >
        {/* absolute top-4 right-4 */}
        <button
          type="button"
          onClick={onClose}
          className="group absolute top-2 right-2 flex cursor-pointer justify-self-end transition-colors"
        >
          <X
            size={28}
            className="stroke-text-primary transition-colors group-hover:stroke-secondary-accent"
          />
        </button>

        {/* Scrollable Content  pr-2*/}
        <div className="max-h-[calc(80dvh-64px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

// export default Modal;
