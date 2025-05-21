import Link from "next/link";

import { prisma } from "@/prisma/prismaClient";
import {
  Announcements,
  BigCalendar,
  PerformancePieChart,
  StudentCardWrapper,
} from "@/components/entities";
import { bigCalendarEvents, getUserSession } from "@/utils/helpers";
import type { IStudentResponse } from "@/utils/models/response";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserSession();
  if (!user) return null;
  const { id } = await params;

  const student: IStudentResponse | null = await prisma.student.findUnique({
    where: { id },
    include: {
      user: { select: { email: true, username: true, avatar: true } },
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });
  if (!student) return null;

  const events = await bigCalendarEvents({ type: "userId", id });

  return (
    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="flex w-full flex-col gap-4 xl:w-2/3">
        {/* teacher main data */}
        <StudentCardWrapper student={student} role={user.role} />
        {/* BOTTOM CHART*/}
        <div className="flex flex-1 flex-col rounded-2xl bg-background p-4 not-first:gap-1">
          <div className="text-xl font-semibold text-text-highlight">
            <h1>Student&apos;s Schedule</h1>
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
              href={`/list/lessons?classId=2`}
            >
              Student&apos;s Lessons
            </Link>
            <Link
              className="rounded-md bg-secondary-highlight p-3 whitespace-nowrap"
              href={`/list/teachers?classId=2`}
            >
              Student&apos;s Teachers
            </Link>
            <Link
              className="rounded-md bg-secondary-highlight p-3 whitespace-nowrap"
              href={`/list/exams?classId=2`}
            >
              Student&apos;s Exams
            </Link>
            <Link
              className="rounded-md bg-tertiary-highlight p-3 whitespace-nowrap"
              href={`/list/assignments?classId=2`}
            >
              Student&apos;s Assignments
            </Link>
            <Link
              className="rounded-md bg-primary-highlight p-3 whitespace-nowrap"
              href={`/list/results?studentId=student2`}
            >
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <PerformancePieChart />
        <Announcements />
      </div>
    </div>
  );
}
