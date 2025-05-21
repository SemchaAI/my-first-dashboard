"use client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { User } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./Form";
import { InputField, SelectField } from "@/components/features";
import { createSubject, updateSubject } from "@/utils/actions/forms";
import { type SubjectSchema, subjectSchema } from "@/utils/config";
import type { ISubjectForm } from "@/utils/models/forms";
interface IProps extends ISubjectForm {
  onClose: () => void;
}

export const SubjectForm = ({ type, data, onClose }: IProps) => {
  console.log("📦 SubjectForm dynamically loaded", type, data);
  const form = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      teachers: type === "Create" ? [] : data.teachers,
      name: data.name,
      id: data.id,
    },
  });
  const submitHandler = async (formData: SubjectSchema) => {
    console.log("Submitting:", type, formData);
    try {
      let response: { isSuccess: boolean; message: string };

      switch (type) {
        case "Create":
          response = await createSubject(formData);
          break;
        case "Update":
          response = await updateSubject(formData);
          break;
        default:
          throw new Error(`Unknown operation type: ${type}`);
      }

      if (response.isSuccess) {
        toast.success(response.message);
        onClose();
      } else {
        form.setError("name", { message: response.message });
      }
    } catch (error) {
      console.error("[SubjectForm]", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Form title={`${type} Subject`} form={form} onSubmit={submitHandler}>
      {
        // inputs
        <>
          <InputField
            id="id"
            label="Subject id"
            type="text"
            Icon={User}
            hidden
          />
          <SelectField
            name="teachers"
            label="Select teachers:"
            options={data.teachers.map((teacher) => ({
              value: teacher,
              label: teacher,
            }))}
            isClearable
            isMulti
            menuPortalTarget={document.body}
          />
          <InputField
            defaultValue={data?.name}
            id="name"
            label="Subject name"
            type="text"
            Icon={User}
          />
        </>
      }
      {
        // formControls
        <div className="flex h-20">
          <button type="submit">{type}</button>
        </div>
      }
    </Form>
  );
};
