"use client";
import { Modal } from "@/components/features";
import { Button } from "@/components/shared";
import { useModal } from "@/utils/hooks";
import { IResponse } from "@/utils/models/response";
import toast from "react-hot-toast";

interface IProps<T extends number | string> {
  id: T;
  button: React.ReactNode;
  title?: string;
  confirmText?: string;
  onDelete: (id: T) => Promise<IResponse>;
}

export const DeleteModal = <T extends number | string>({
  button,
  title = "Delete item?",
  confirmText = "Are you sure you want to delete this item?",
  onDelete,
  id,
}: IProps<T>) => {
  const { close, open, isOpen } = useModal();

  const handleDelete = async () => {
    try {
      const { isSuccess, message } = await onDelete(id);
      if (isSuccess) {
        toast.success(message);
        close();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("[DeleteModal]", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        onClick={open}
        className="flex cursor-pointer items-center justify-center"
      >
        {button}
      </button>
      <Modal isOpen={isOpen} onClose={close}>
        <div className="flex flex-col gap-4 p-4">
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-base">{confirmText}</p>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};
