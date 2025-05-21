import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { prisma } from "@/prisma/prismaClient";
import { ROUTES } from "@/utils/config/routes";
import { Role } from "@prisma/client";
import { getUserSession } from "@/utils/helpers";

import type { TeacherSchema } from "@/utils/config";
import type { IResponse } from "@/utils/models/response";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserSession();
    if (!user)
      return NextResponse.json<IResponse>(
        { isSuccess: false, message: "Unauthorized" },
        { status: 401 },
      );

    // Extract query parameters
    const data: TeacherSchema = await req.json();
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
    return NextResponse.json<IResponse>(
      { isSuccess: true, message: "Teacher created" },
      { status: 200 },
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Something went wrong";
    console.error(`[POST TEACHER] Server error: ${msg}`);
    return NextResponse.json<IResponse>(
      { isSuccess: false, message: "Teacher not created" },
      { status: 500 },
    );
  }
}

// export const createTeacher = async (
//   data: TeacherSchema,
// ): Promise<IResponse> => {
//   if (!data.password) {
//     return { isSuccess: false, message: "Password is required" };
//   }
//   try {
//     await prisma.user.create({
//       data: {
//         username: data.username,
//         password: bcrypt.hashSync(data.password, 10),
//         email: data.email,
//         role: Role.TEACHER,
//         avatar: data.img,
//         teacher: {
//           create: {
//             name: data.name,
//             surname: data.surname,
//             phone: data.phone,
//             address: data.address,
//             birthday: data.birthday,
//             sex: data.sex,
//             bloodType: data.bloodType,
//             subjects: {
//               connect: data.subjects?.map((subjectId: string) => ({
//                 id: parseInt(subjectId),
//               })),
//             },
//           },
//         },
//       },
//     });

//     revalidatePath(ROUTES.TEACHERS);
//     return { isSuccess: true, message: "Teacher created" };
//   } catch (err) {
//     console.log(err);
//     return { isSuccess: false, message: "Teacher not created" };
//   }
// };
