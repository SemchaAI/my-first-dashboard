"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Asterisk,
  CakeSlice,
  Droplet,
  KeyRound,
  Link,
  Mail,
  Map,
  Phone,
  User,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./Form";
import { InputField, SelectField } from "@/components/features";
import { UserSex } from "@prisma/client";
import { createTeacher, updateTeacher } from "@/utils/actions/forms";

import { type TeacherSchema, teacherSchema } from "@/utils/config";
import type { ITeacherForm } from "@/utils/models/forms";
import type { ISubject, ISubjectResponse } from "@/utils/models/response";
import { fetcher } from "@/utils/helpers";

interface IProps extends ITeacherForm {
  onClose: () => void;
}

export const TeacherForm = ({ type, data, onClose }: IProps) => {
  console.log("📦 TeacherForm dynamically loaded", type);
  const [selectSubjects, setSelectSubjects] = useState<ISubject[]>([]);
  const form = useForm({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      id: data?.id,
      username: data?.username,
      email: data?.email,
      password: data?.password,

      name: data?.name,
      surname: data?.surname,
      phone: data?.phone,
      address: data?.address,
      // birthday was defined on input directly for type safe
      //  (Date but default value is string YYYY-MM-DD)
      sex: data?.sex,
      bloodType: data?.bloodType,
      img: data?.img,
      subjects: data?.subjects,
      //
      formType: type,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (selectSubjects.length > 0) return;
    async function fetchData() {
      const data = await fetcher<ISubjectResponse>("/api/subjects");
      if (data.subjects) {
        setSelectSubjects(data.subjects);
      }
    }
    fetchData();
  }, [selectSubjects]);

  const submitHandler = async (formData: TeacherSchema) => {
    let response: { isSuccess: boolean; message: string };

    switch (type) {
      case "Create":
        response = await createTeacher(formData);
        break;
      case "Update":
        response = await updateTeacher(formData);
        break;
      default:
        throw new Error(`Unknown operation type: ${type}`);
    }
    console.log("response", response);
    if (response.isSuccess) {
      toast.success(response.message);
      onClose();
    } else {
      form.setError("username", { message: response.message });
    }
  };

  return (
    <Form title={`${type} Teacher`} form={form} onSubmit={submitHandler}>
      {
        // inputs
        <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          <InputField id="username" label="Username" type="text" Icon={User} />
          <InputField id="email" label="Email" type="email" Icon={Mail} />
          <InputField
            id="password"
            label="Password"
            type="password"
            Icon={KeyRound}
            EyeIcon
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            Icon={Asterisk}
          />
          <InputField id="name" label="Name" type="text" Icon={User} />
          <InputField id="surname" label="Surname" type="text" Icon={User} />
          {/* SEX SELECT */}
          <SelectField
            name="sex"
            label="Sex:"
            options={Object.values(UserSex).map((sex) => ({
              label: sex.charAt(0).toUpperCase() + sex.slice(1).toLowerCase(),
              value: sex,
            }))}
            isClearable
          />
          {/* SUBJECT SELECT */}
          <div className="max-w-[257px]">
            <SelectField
              name="subjects"
              label="Subjects:"
              options={
                selectSubjects.map((subject) => ({
                  label: subject.name,
                  value: subject.id.toString(),
                })) || []
              }
              isLoading={selectSubjects.length === 0}
              isDisabled={selectSubjects.length === 0}
              isMulti
              isClearable
              isSearchable
            />
          </div>
          <InputField id="phone" label="Phone" type="text" Icon={Phone} />
          <InputField id="address" label="Address" type="text" Icon={Map} />
          <InputField
            id="birthday"
            label="Birthday"
            type="date"
            defaultValue={data?.birthday?.toISOString().split("T")[0]}
            Icon={CakeSlice}
          />
          <InputField
            id="bloodType"
            label="Blood Type"
            type="text"
            Icon={Droplet}
          />

          <InputField id="img" label="Image" type="text" Icon={Link} />
        </div>
      }
      {
        // formControls
        <div className="flex h-10">
          <button type="submit">Click</button>
        </div>
      }
    </Form>
  );
};
