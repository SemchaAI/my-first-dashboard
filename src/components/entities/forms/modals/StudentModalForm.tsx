"use client";
import dynamic from "next/dynamic";
import { Modal } from "@/components/features";

import { useModal } from "@/utils/hooks";

import type { IStudentForm } from "@/utils/models/forms";

interface IProps extends IStudentForm {
  button: React.ReactNode;
}

const StudentForm = dynamic(
  () => import("../StudentForm").then((mod) => mod.StudentForm),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

export const StudentModalForm = ({ type, data, button }: IProps) => {
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
        {isOpen && <StudentForm type={type} data={data} onClose={close} />}
      </Modal>
    </>
  );
};
