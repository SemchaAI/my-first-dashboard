"use client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Asterisk, CakeSlice, Droplet, KeyRound } from "lucide-react";
import { Link, Mail, Map, Phone, User } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./Form";
import { InputField, SelectField } from "@/components/features";
import { UserSex } from "@prisma/client";
// import { createTeacher, updateTeacher } from "@/utils/actions/forms";

import { type StudentSchema, studentSchema } from "@/utils/config";
import type { IStudentForm } from "@/utils/models/forms";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/helpers";
import {
  IClass,
  IClassResponse,
  IGrade,
  IGradesResponse,
} from "@/utils/models/response";
import { createStudent, updateStudent } from "@/utils/actions/forms";

type DataState = {
  grades: IGrade[];
  classes: IClass[];
};

interface IProps extends IStudentForm {
  onClose: () => void;
}

export const StudentForm = ({ type, data, onClose }: IProps) => {
  console.log("📦 StudentForm dynamically loaded", type);
  const form = useForm({
    resolver: zodResolver(studentSchema),
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
      // subjects: data?.subjects,
      gradeId: data?.gradeId,
      classId: data?.classId,
      parentId: data?.parentId,
      //
      formType: type,
    },
    mode: "onChange",
  });
  const submitHandler = async (formData: StudentSchema) => {
    console.log("Submitting:", type, formData);
    let response: { isSuccess: boolean; message: string };

    switch (type) {
      case "Create":
        response = await createStudent(formData);
        break;
      case "Update":
        response = await updateStudent(formData);
        break;
      default:
        throw new Error(`Unknown operation type: ${type}`);
    }
    if (response.isSuccess) {
      toast.success(response.message);
      onClose();
    } else {
      form.setError("username", { message: response.message });
    }
  };

  const [selectData, setSelectData] = useState<DataState>({
    grades: [],
    classes: [],
  });
  useEffect(() => {
    if (selectData.classes.length > 0 && selectData.grades.length > 0) return;
    async function fetchData() {
      try {
        const [gradesData, classesData] = await Promise.all([
          fetcher<IGradesResponse>("/api/grades"),
          fetcher<IClassResponse>("/api/classes"),
        ]);
        if (gradesData.isSuccess && classesData.isSuccess) {
          setSelectData({
            grades: gradesData.grades,
            classes: classesData.classes,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data.Reload the page.", { duration: 5000 });
      }
    }
    fetchData();
  }, [selectData]);

  return (
    <Form title={`${type} Student`} form={form} onSubmit={submitHandler}>
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
          {/* SELECT */}
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
          <InputField id="parentId" label="Parent Id" type="text" Icon={User} />
          <SelectField
            name="gradeId"
            label="Grade Id:"
            options={selectData.grades.map((grade) => ({
              label: `${grade.level}`,
              value: `${grade.id}`,
            }))}
            isLoading={selectData.grades.length === 0}
            isDisabled={selectData.grades.length === 0}
            menuPortalTarget={document.body}
            isClearable
          />
          <SelectField
            name="classId"
            label="Class Id:"
            options={selectData.classes.map((i) => ({
              label: `${i.name}-${i._count.students}/${i.capacity}`,
              value: `${i.id}`,
            }))}
            isLoading={selectData.classes.length === 0}
            isDisabled={selectData.classes.length === 0}
            menuPortalTarget={document.body}
            isClearable
          />

          {/* SELECT */}
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
