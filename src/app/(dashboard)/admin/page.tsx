"use server";
import {
  Announcements,
  AttendanceChart,
  EventCalendar,
  FinanceChart,
  GenderChart,
  AdminStatisticsCard,
} from "@/components/entities";
import { prisma } from "@/prisma/prismaClient";

export default async function AdminPage() {
  const [userCount, studentCount, parentCount, teacherCount] =
    await prisma.$transaction([
      prisma.user.count(),
      prisma.student.count(),
      prisma.parent.count(),
      prisma.teacher.count(),
    ]);
  const now = new Date();
  const formatted = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
  const adminCount = userCount - studentCount - parentCount - teacherCount;
  return (
    <div className="flex flex-1 flex-col gap-4 md:flex-row">
      {/* left */}
      <div className="flex w-full flex-col gap-8 lg:w-2/3">
        {/* user cards   */}
        <ul className="flex flex-wrap justify-between gap-4">
          <AdminStatisticsCard
            type="admin"
            date={formatted}
            total={adminCount}
          />
          <AdminStatisticsCard
            type="teacher"
            date={formatted}
            total={teacherCount}
          />
          <AdminStatisticsCard
            type="student"
            date={formatted}
            total={studentCount}
          />
          <AdminStatisticsCard
            type="parent"
            date={formatted}
            total={parentCount}
          />
        </ul>
        {/* MIDDLE CHARTS */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          <div className="h-[450px] w-full lg:w-1/3">
            <GenderChart />
          </div>
          <div className="h-[450px] w-full lg:w-2/3">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="h-[500px] w-full">
          <FinanceChart />
        </div>
      </div>

      {/* right */}
      <div className="flex w-full flex-col gap-8 lg:w-1/3">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
