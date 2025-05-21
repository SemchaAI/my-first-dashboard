"use client";
import dynamic from "next/dynamic";
import { Modal } from "@/components/features";

import { useModal } from "@/utils/hooks";

import type { ITeacherForm } from "@/utils/models/forms";

interface IProps extends ITeacherForm {
  button: React.ReactNode;
}

const TeacherForm = dynamic(
  () => import("../TeacherForm").then((mod) => mod.TeacherForm),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

export const TeacherModalForm = ({ type, data, button }: IProps) => {
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
        {isOpen && <TeacherForm type={type} data={data} onClose={close} />}
      </Modal>
    </>
  );
};
