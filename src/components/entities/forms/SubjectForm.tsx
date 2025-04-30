"use client";
// import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { User } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./Form";
import { InputField, MultiSelectField } from "@/components/features";
import {
  createSubject,
  updateSubject,
  deleteSubject,
} from "@/utils/actions/forms";
import { type SubjectSchema, subjectSchema } from "@/utils/config";
import toast from "react-hot-toast";

interface IProps {
  type: "Create" | "Update" | "Delete";
  data: SubjectSchema;
}

export const SubjectForm = ({ type, data }: IProps) => {
  console.log("📦 SubjectForm dynamically loaded", type, data);

  const form = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      teachers: [],
      name: data.name,
      id: data.id,
    },
  });
  const submitHandler = async (data: SubjectSchema) => {
    console.log("data", data);
    try {
      console.log("SubjectForm", data, type);
      if (type === "Create") {
        const { success, message } = await createSubject(data);
        toast[success ? "success" : "error"](message);
      }
      if (type === "Update") {
        const { success, message } = await updateSubject(data);
        toast[success ? "success" : "error"](message);
      }
      if (type === "Delete") {
        if (data.id === undefined) {
          toast.error("Subject id not found");
          return;
        }
        const { success, message } = await deleteSubject(data.id);
        toast[success ? "success" : "error"](message);
      }
    } catch (error) {
      console.log("[SubjectForm]", error);
    }
  };

  const handleMultiSelectChange = (selectedOption: string) => {
    const currentValues = form.getValues("teachers") || [];
    const exists = currentValues.some(
      (value: string) => value === selectedOption,
    );

    const updatedValues = exists
      ? currentValues.filter((value: string) => value !== selectedOption) // Remove if already selected
      : [...currentValues, selectedOption];

    form.setValue("teachers", updatedValues, { shouldValidate: true });
  };
  const handleMultiSelectClear = () => {
    form.setValue("teachers", [], { shouldValidate: true });
  };

  return (
    <Form title={`${type} Subject`} form={form} onSubmit={submitHandler}>
      {
        // inputs
        <>
          <InputField
            defaultValue={data?.id}
            id="id"
            label="Subject id"
            type="text"
            Icon={User}
            hidden
          />
          {type !== "Delete" ? (
            <>
              <MultiSelectField
                options={data.teachers.map((teacher) => ({
                  value: teacher,
                  label: teacher,
                }))}
                name="teachers"
                value={form.getValues("teachers")}
                onChange={handleMultiSelectChange}
                onClear={handleMultiSelectClear}
                placeholder="Select teacher id"
                single
              />
              <InputField
                defaultValue={data?.name}
                id="name"
                label="Subject name"
                type="text"
                Icon={User}
              />
            </>
          ) : (
            <div className="flex flex-col">
              <p> A you sure you want to delete this subject?</p>
              <span className="rounded-2xl bg-primary p-2 text-center font-bold text-text-highlight">
                {data.name}
              </span>
            </div>
          )}
        </>
      }
      {
        // formControls
        <div>
          <button type="submit">{type}</button>
        </div>
      }
    </Form>
  );
};
