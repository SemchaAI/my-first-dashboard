// import { Class } from "@prisma/client";
import type { SubjectSchema, ClassSchema, TeacherSchema } from "../config";
import { StudentSchema } from "../config/schemas";

interface IFormType {
  type: "Create" | "Update"; //| "Delete"
}
export interface ISubjectForm extends IFormType {
  data: SubjectSchema;
}
export interface IClassForm extends IFormType {
  //ClassSchema &
  data: Partial<ClassSchema> & {
    teachers: { id: string; name: string; surname: string }[];
    grades: { id: number; level: number }[];
  };
}
export interface ITeacherForm extends IFormType {
  data?: TeacherSchema;
  // & {
  //   teacherSubjects: { id: number; name: string }[];
  // };
}

// interface studentClasses extends Class {
//   _count: {
//     students: number;
//   };
// }
export interface IStudentForm extends IFormType {
  //ClassSchema &
  data?: Partial<StudentSchema>;
  //& {
  // teacherSubjects: { id: number; name: string }[];
  //   studentGrades: { id: number; level: number }[];
  //   studentClasses: studentClasses[];
  // };
}
