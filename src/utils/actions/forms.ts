"use server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/prisma/prismaClient";
import { ROUTES } from "@/utils/config/routes";

import type { SubjectSchema } from "../config";
import type { IResponse } from "../models/response";

// type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  data: SubjectSchema,
): Promise<IResponse> => {
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
    return { success: true, error: false, message: "Subject created" };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, message: "Subject not created" };
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
    return { success: true, error: false, message: "Subject updated" };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, message: "Subject not updated" };
  }
};

export const deleteSubject = async (id: number): Promise<IResponse> => {
  try {
    await prisma.subject.delete({
      where: { id },
    });
    revalidatePath(ROUTES.SUBJECTS);
    return { success: true, error: false, message: "Subject deleted" };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, message: "Subject not deleted" };
  }
};
