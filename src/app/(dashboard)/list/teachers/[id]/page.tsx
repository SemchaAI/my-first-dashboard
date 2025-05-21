import Link from "next/link";

import { prisma } from "@/prisma/prismaClient";
import {
  Announcements,
  BigCalendar,
  PerformancePieChart,
  // TeacherCardWrapper,
  TeacherModalForm,
  UserCard,
} from "@/components/entities";
import { bigCalendarEvents, getUserSession } from "@/utils/helpers";
import type { ITeacherResponse } from "@/utils/models/response";
import { SquarePen } from "lucide-react";
import { IUserCard } from "@/utils/models/cards";

export default async function TeacherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserSession();
  if (!user) return null;
  const { id } = await params;

  const teacher: ITeacherResponse | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
      user: { select: { email: true, username: true, avatar: true } },
      subjects: { select: { id: true, name: true } },
    },
  });
  if (!teacher) return null;

  const userFlatStructure: IUserCard = {
    avatar: teacher.user.avatar,
    username: teacher.user.username,
    name: teacher.name,
    surname: teacher.surname,
    bloodType: teacher.bloodType,
    birthday: teacher.birthday,
    email: teacher.user.email,
    phone: teacher.phone,
    //-------------------------
    statistic: [
      {
        title: "Attendance",
        value: "90%",
        url: "/static/img/singleAttendance.png",
      },
      {
        title: "Branches",
        value: teacher._count.subjects,
        url: "/static/img/singleBranch.png",
      },
      {
        title: "Lessons",
        value: teacher._count.lessons,
        url: "/static/img/singleLesson.png",
      },
      {
        title: "Classes",
        value: teacher._count.classes,
        url: "/static/img/singleClass.png",
      },
    ],
  };
  const modalData = {
    address: teacher.address,
    birthday: teacher.birthday, // 'YYYY-MM-DD' important for date picker
    bloodType: teacher.bloodType,
    email: teacher.user.email,
    id: teacher.id,
    img: teacher.user.avatar || undefined,
    name: teacher.name,
    password: "",
    phone: teacher.phone || undefined,
    sex: teacher.sex,
    surname: teacher.surname,
    username: teacher.user.username,

    subjects: teacher.subjects.map((subject) => subject.id.toString()),
    formType: "Update" as const,
  };

  // events
  const events = await bigCalendarEvents({ type: "teacherId", id });

  return (
    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="flex w-full flex-col gap-4 xl:w-2/3">
        {/* teacher main data */}
        {/* <TeacherCardWrapper teacher={{ ...teacher }} role={user.role} /> */}
        <UserCard user={userFlatStructure}>
          {user.role === "ADMIN" && (
            <TeacherModalForm
              type="Update"
              button={<SquarePen size={20} className="stroke-text-highlight" />}
              data={modalData}
            />
          )}
        </UserCard>
        {/* BOTTOM CHART*/}
        <div className="flex flex-1 flex-col rounded-2xl bg-background p-4 not-first:gap-1">
          <div className="text-xl font-semibold text-text-highlight">
            <h1>Teacher&apos;s Schedule</h1>
          </div>
          <div className="max-h-[750px] grow overflow-y-auto">
            <BigCalendar events={events} />
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex w-full flex-col gap-4 xl:w-1/3">
        {/* shortcuts */}
        <div className="rounded-md bg-background p-4">
          <h3 className="text-xl font-semibold">Shortcuts</h3>
          <div className="flex flex-wrap gap-4 text-xs text-text-primary">
            <Link
              className="rounded-md bg-primary-highlight p-3 whitespace-nowrap"
              href={`/list/classes?supervisorId=teacher2`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="rounded-md bg-secondary-highlight p-3 whitespace-nowrap"
              href={`/list/students?teacherId=teacher2`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="rounded-md bg-tertiary-highlight p-3 whitespace-nowrap"
              href={`/list/lessons?teacherId=teacher2`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="rounded-md bg-primary-highlight p-3 whitespace-nowrap"
              href={`/list/exams?teacherId=teacher2`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="rounded-md bg-secondary-highlight p-3 whitespace-nowrap"
              href={`/list/assignments?teacherId=teacher2`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <PerformancePieChart />
        <Announcements />
      </div>
    </div>
  );
}
