"use client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { BookUser, School } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./Form";
import { InputField, SelectField } from "@/components/features";
import { createClass, updateClass } from "@/utils/actions/forms";
import { type ClassSchema, classSchema } from "@/utils/config";
import type { IClassForm } from "@/utils/models/forms";

interface IProps extends IClassForm {
  onClose: () => void;
}

export const ClassForm = ({ type, data, onClose }: IProps) => {
  console.log("📦 ClassForm dynamically loaded", type);
  const form = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      capacity: data.capacity,
      gradeId: data.gradeId,
      supervisorId: data.supervisorId,
      name: data.name,
      id: data.id,
    },
  });
  // const { watch, setValue } = form;
  const submitHandler = async (formData: ClassSchema) => {
    console.log("Submitting:", type, formData);
    try {
      let response: { isSuccess: boolean; message: string };

      switch (type) {
        case "Create":
          response = await createClass(formData);
          break;
        case "Update":
          response = await updateClass(formData);
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

  // const handleTeacherChange = (selectedOption: string) => {
  //   setValue("supervisorId", selectedOption, { shouldValidate: true });
  // };

  // const handleTeacherClear = () => {
  //   setValue("supervisorId", "", { shouldValidate: true });
  // };

  // const handleGradeChange = (selectedOption: string) => {
  //   setValue("gradeId", Number(selectedOption), { shouldValidate: true });
  // };

  // const handleGradeClear = () => {
  //   setValue("gradeId", 0, { shouldValidate: true });
  // };

  return (
    <Form title={`${type} Class`} form={form} onSubmit={submitHandler}>
      {
        // inputs
        <>
          <SelectField
            name="supervisorId"
            label="Teacher supervisor:"
            options={data.teachers.map((teacher) => ({
              value: teacher.id,
              label: teacher.name,
            }))}
            menuPortalTarget={document.body}
          />
          <SelectField
            name="gradeId"
            label="Grade:"
            options={data.grades.map((grade) => ({
              value: grade.id.toString(),
              label: grade.level.toString(),
            }))}
            isClearable
            menuPortalTarget={document.body}
          />
          <InputField id="name" label="Class name" type="text" Icon={School} />
          <InputField
            id="capacity"
            label="Capacity"
            type="number"
            Icon={BookUser}
          />
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
