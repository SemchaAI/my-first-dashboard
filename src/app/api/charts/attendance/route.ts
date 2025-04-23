import { prisma } from "@/prisma/prismaClient";
import { UnauthorizedError, ApiError } from "@/utils/config";
import { getUserSession } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user) throw new UnauthorizedError();

    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday);

    const res = await prisma.attendance.findMany({
      where: {
        date: {
          gte: lastMonday,
        },
      },
      select: {
        date: true,
        present: true,
      },
    });
    if (!res) throw new ApiError("Failed to fetch attendance", 500);
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const attendanceMap: {
      [key: string]: { present: number; absent: number };
    } = {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

    res.forEach((item) => {
      const itemDate = new Date(item.date);
      const dayOfWeek = itemDate.getDay();

      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const dayName = daysOfWeek[dayOfWeek - 1];

        if (item.present) {
          attendanceMap[dayName].present += 1;
        } else {
          attendanceMap[dayName].absent += 1;
        }
      }
    });

    const data = daysOfWeek.map((day) => ({
      name: day,
      present: attendanceMap[day].present,
      absent: attendanceMap[day].absent,
    }));
    return NextResponse.json({ data });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Something went wrong";
    console.error(`[GET ATTENDANCE] Server error: ${msg}`);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
