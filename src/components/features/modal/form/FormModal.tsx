"use client";
import { TeacherForm } from "@/components/entities";
import { ModalTrigger } from "../ModalWithTrigger";

interface IProps {
  trigger: React.ReactNode;
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}

export const FormModal = ({ trigger, table, type, data, id }: IProps) => {
  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="flex flex-col gap-4">
        <h1 className="pr-7 text-xl font-semibold text-text-highlight">
          Delete
        </h1>
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="w-max self-center rounded-md border-none bg-red-700 px-4 py-2 text-white">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      // forms[table](type, data)
      <TeacherForm type={type} data={data} />
    ) : (
      "Form not found!"
    );
  };

  return (
    <ModalTrigger button={trigger}>
      <Form />
    </ModalTrigger>
  );
};
