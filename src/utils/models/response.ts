import type { Class, Student, Teacher } from "@prisma/client";

export interface IResponse {
  isSuccess: boolean;
  message: string;
}
export interface ISubject {
  id: number;
  name: string;
}
export interface IGrade {
  id: number;
  level: number;
}
export interface IClass extends Class {
  _count: { students: number };
}

export interface ISubjectResponse extends IResponse {
  subjects?: ISubject[];
}
export interface IGradesResponse extends IResponse {
  grades?: IGrade[];
}
export interface IClassResponse extends IResponse {
  classes?: IClass[];
}

export interface ITeacherResponse extends Teacher {
  _count: { subjects: number; lessons: number; classes: number };
  user: { username: string; email: string; avatar: string | null };
  subjects: { id: number; name: string }[];
}

export interface IStudentResponse extends Student {
  user: { username: string; email: string; avatar: string | null };
  class: Class & { _count: { lessons: number } };
}
