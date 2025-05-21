"use client";
import dynamic from "next/dynamic";
import { Modal } from "@/components/features";

import { useModal } from "@/utils/hooks";

import type { IClassForm } from "@/utils/models/forms";

interface IProps extends IClassForm {
  button: React.ReactNode;
}

const ClassForm = dynamic(
  () => import("../ClassForm").then((mod) => mod.ClassForm),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

export const ClassModalForm = ({ type, data, button }: IProps) => {
  const { close, open, isOpen } = useModal();

  return (
    <>
      <button
        onClick={open}
        className="flex cursor-pointer items-center justify-center"
      >
        {button}
      </button>
      <Modal isOpen={isOpen} onClose={close}>
        {isOpen && <ClassForm type={type} data={data} onClose={close} />}
      </Modal>
    </>
  );
};
