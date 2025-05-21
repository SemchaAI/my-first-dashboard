"use client";
import dynamic from "next/dynamic";
import { Modal } from "@/components/features";

import { useModal } from "@/utils/hooks";

import type { ISubjectForm } from "@/utils/models/forms";

interface IProps extends ISubjectForm {
  button: React.ReactNode;
}

const SubjectForm = dynamic(
  () => import("../SubjectForm").then((mod) => mod.SubjectForm),
  {
    loading: () => <h1>Loading...</h1>,
  },
);

export const SubjectModalForm = ({ type, data, button }: IProps) => {
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
        {isOpen && <SubjectForm type={type} data={data} onClose={close} />}
      </Modal>
    </>
  );
};
