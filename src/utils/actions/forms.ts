"use server";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { prisma } from "@/prisma/prismaClient";
import { ROUTES } from "@/utils/config/routes";

import type { SubjectSchema } from "../config";
import type { IResponse } from "../models/response";
import type {
  ClassSchema,
  StudentSchema,
  TeacherSchema,
} from "../config/schemas";
import { Role } from "@prisma/client";

// type CurrentState = { success: boolean; error: boolean };

// SUBJECT START
export const createSubject = async (
  data: SubjectSchema,
): Promise<IResponse> => {
  console.log("createSubject:", data);
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    revalidatePath(ROUTES.SUBJECTS);
    return { isSuccess: true, message: "Subject created" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Subject not created" };
  }
};
export const updateSubject = async (
  data: SubjectSchema,
): Promise<IResponse> => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    revalidatePath(ROUTES.SUBJECTS);
    return { isSuccess: true, message: "Subject updated" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Subject not updated" };
  }
};

export const deleteSubject = async (id: number): Promise<IResponse> => {
  try {
    await prisma.subject.delete({
      where: { id },
    });
    revalidatePath(ROUTES.SUBJECTS);
    return { isSuccess: true, message: "Subject deleted" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Subject not deleted" };
  }
};
// SUBJECT END

// CLASS START
export const createClass = async (data: ClassSchema): Promise<IResponse> => {
  console.log("createClass", data);
  try {
    await prisma.class.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        grade: {
          connect: { id: data.gradeId },
        },
        supervisor: data.supervisorId
          ? { connect: { id: data.supervisorId } }
          : undefined,
      },
    });
    revalidatePath(ROUTES.CLASSES);
    return { isSuccess: true, message: "Class created" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Class not created" };
  }
};

export const updateClass = async (data: ClassSchema): Promise<IResponse> => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });
    revalidatePath(ROUTES.CLASSES);
    return { isSuccess: true, message: "Class updated" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Class not updated" };
  }
};

export const deleteClass = async (id: number): Promise<IResponse> => {
  try {
    await prisma.class.delete({
      where: { id },
    });
    revalidatePath(ROUTES.CLASSES);
    return { isSuccess: true, message: "Class deleted" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Class not deleted" };
  }
};
// CLASS END

// TEACHER START
export const createTeacher = async (
  data: TeacherSchema,
): Promise<IResponse> => {
  if (!data.password) {
    return { isSuccess: false, message: "Password is required" };
  }
  try {
    await prisma.user.create({
      data: {
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
        email: data.email,
        role: Role.TEACHER,
        avatar: data.img,
        teacher: {
          create: {
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            address: data.address,
            birthday: data.birthday,
            sex: data.sex,
            bloodType: data.bloodType,
            subjects: {
              connect: data.subjects?.map((subjectId: string) => ({
                id: parseInt(subjectId),
              })),
            },
          },
        },
      },
    });

    revalidatePath(ROUTES.TEACHERS);
    return { isSuccess: true, message: "Teacher created" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Teacher not created" };
  }
};

export const updateTeacher = async (data: TeacherSchema) => {
  if (!data.id) {
    return { isSuccess: false, message: "Teacher not found" };
  }
  try {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" &&
          data.password && {
            password: bcrypt.hashSync(data.password, 10),
          }),
        username: data.username,
        avatar: data.img,
        email: data.email,
        teacher: {
          update: {
            name: data.name,
            surname: data.surname,
            phone: data.phone || null,
            address: data.address,
            birthday: data.birthday,
            sex: data.sex,
            bloodType: data.bloodType,
            subjects: {
              set: data.subjects?.map((subjectId: string) => ({
                id: parseInt(subjectId),
              })),
            },
          },
        },
      },
    });

    revalidatePath(`${ROUTES.TEACHERS}/${data.id}`);
    return { isSuccess: true, message: "Teacher updated" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Teacher not updated" };
  }
};

export const deleteTeacher = async (id: string): Promise<IResponse> => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) {
      return { isSuccess: false, message: "Teacher not found" };
    }
    // 2. Delete the teacher
    await prisma.teacher.delete({ where: { id } });
    // 3. Delete the user
    await prisma.user.delete({ where: { id: teacher.id } });

    revalidatePath(ROUTES.TEACHERS);
    return { isSuccess: true, message: "Teacher deleted" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Teacher not deleted" };
  }
};
// TEACHER END

//STUDENT START
export const createStudent = async (
  data: StudentSchema,
): Promise<IResponse> => {
  console.log(data);
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });
    console.log("classItem", classItem.capacity, classItem._count.students);
    if (classItem && classItem.capacity === classItem._count.students) {
      return { isSuccess: false, message: "Class is full" };
    }

    const isExist = await prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
    if (isExist) {
      return { isSuccess: false, message: "Username/Email already exists" };
    }

    const isNotUniqPhone = await prisma.student.findFirst({
      where: { phone: data.phone },
    });
    if (isNotUniqPhone) {
      return { isSuccess: false, message: "Phone number already exists" };
    }

    await prisma.user.create({
      data: {
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
        email: data.email,
        role: Role.STUDENT,
        avatar: data.img,
        student: {
          create: {
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            address: data.address,
            birthday: data.birthday,
            sex: data.sex,
            bloodType: data.bloodType,
            gradeId: data.gradeId,
            classId: data.classId,
            parentId: data.parentId,
          },
        },
      },
    });

    revalidatePath(ROUTES.STUDENTS);
    return { isSuccess: true, message: "Student created" };
  } catch (err) {
    console.log("[CREATE STUDENT]", err);
    return { isSuccess: false, message: `Student not created` };
  }
};

export const updateStudent = async (
  data: StudentSchema,
): Promise<IResponse> => {
  if (!data.id) return { isSuccess: false, message: "Student not found" };
  try {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" &&
          data.password && {
            password: bcrypt.hashSync(data.password, 10),
          }),
        username: data.username,

        email: data.email,
        role: Role.STUDENT,
        avatar: data.img,
        student: {
          update: {
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            address: data.address,
            birthday: data.birthday,
            sex: data.sex,
            bloodType: data.bloodType,
            gradeId: data.gradeId,
            classId: data.classId,
            parentId: data.parentId,
          },
        },
      },
    });
    revalidatePath(`${ROUTES.STUDENTS}/${data.id}`);
    return { isSuccess: true, message: "Student updated" };
  } catch (err) {
    console.log("[UPDATE STUDENT]", err);
    return { isSuccess: false, message: "Student not updated" };
  }
};

export const deleteStudent = async (id: string): Promise<IResponse> => {
  try {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return { isSuccess: false, message: "Teacher not found" };
    }
    // 2. Delete the student
    await prisma.student.delete({ where: { id } });
    // 3. Delete the user
    await prisma.user.delete({ where: { id: student.id } });

    revalidatePath(ROUTES.STUDENTS);
    return { isSuccess: true, message: "Student deleted" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, message: "Student not deleted" };
  }
};

//STUDENT END
