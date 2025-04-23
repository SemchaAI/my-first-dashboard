"use server";
import { Header } from "@/components/features";
import { prisma } from "@/prisma/prismaClient";
import { getUserSession } from "@/utils/helpers";
import { Role } from "@prisma/client";

export const Announcements = async () => {
  const user = await getUserSession();
  if (!user) return null;

  const roleConditions = {
    TEACHER: { lessons: { some: { teacherId: user.id } } },
    STUDENT: { students: { some: { id: user.id } } },
    PARENT: { students: { some: { parentId: user.id } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(user.role !== Role.ADMIN && {
        OR: [{ classId: null }, { class: roleConditions[user.role] || {} }],
      }),
    },
  });

  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl bg-background p-4">
      <Header title="Announcements" linkText="View all" link="#" />
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col overflow-hidden rounded-xl p-4 odd:bg-secondary even:bg-primary nth-[3n]:bg-pink-200"
          >
            <div className="flex flex-wrap items-center justify-between gap-1 text-nowrap">
              <h1 className="text-lg font-semibold text-text-highlight">
                {item.title}
              </h1>
              <span className="rounded-2xl bg-background px-2 py-1 text-sm leading-3.5">
                {item.date.toLocaleDateString()}
              </span>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
