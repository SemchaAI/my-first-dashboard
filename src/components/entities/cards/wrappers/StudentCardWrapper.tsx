import { SquarePen } from "lucide-react";

import { prisma } from "@/prisma/prismaClient";
import { StudentModalForm, UserCard } from "@/components/entities";

import type { Role } from "@prisma/client";
import type { IStudentResponse } from "@/utils/models/response";
import type { IUserCard } from "@/utils/models/cards";

interface IProps {
  student: IStudentResponse;
  role: Role;
}

export const StudentCardWrapper = async ({ student, role }: IProps) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: student.id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
        //new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
  });

  const modalData = {
    address: student.address,
    birthday: student.birthday, // 'YYYY-MM-DD' important for date picker
    bloodType: student.bloodType,
    email: student.user.email,
    id: student.id,
    img: student.user.avatar || undefined,
    name: student.name,
    password: "",
    phone: student.phone || undefined,
    sex: student.sex,
    surname: student.surname,
    username: student.user.username,

    gradeId: student.gradeId,
    classId: student.classId,
    parentId: student.parentId,

    formType: "Update" as const,
  };

  const attendanceLength = attendance.length === 0 ? 1 : attendance.length;
  const presentDays = attendance.filter((a) => a.present).length;
  const percentage = Math.round((presentDays / attendanceLength) * 100);

  const userFlatStructure: IUserCard = {
    avatar: student.user.avatar,
    username: student.user.username,
    name: student.name,
    surname: student.surname,
    bloodType: student.bloodType,
    birthday: student.birthday,
    email: student.user.email,
    phone: student.phone,

    //-------------------------
    statistic: [
      {
        title: "Attendance",
        value: `${percentage}%`,
        url: "/static/img/singleAttendance.png",
      },
      {
        title: "Grade",
        value: `${student.class.name.charAt(0)}th`,
        url: "/static/img/singleBranch.png",
      },
      {
        title: "Lessons",
        value: student.class._count.lessons,
        url: "/static/img/singleLesson.png",
      },
      {
        title: "Class",
        value: student.class.name,
        url: "/static/img/singleClass.png",
      },
    ],
  };

  return (
    <UserCard user={userFlatStructure}>
      {role === "ADMIN" && (
        <StudentModalForm
          type="Update"
          button={<SquarePen size={20} className="stroke-text-highlight" />}
          data={modalData}
        />
      )}
    </UserCard>
  );
};
