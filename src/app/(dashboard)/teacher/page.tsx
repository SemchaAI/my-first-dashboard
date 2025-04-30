import { prisma } from "@/prisma/prismaClient";
import { Announcements, BigCalendar } from "@/components/entities";
import { generateRecurringEvents, getUserSession } from "@/utils/helpers";

export default async function TeacherPage() {
  const user = await getUserSession();
  if (!user) return null;

  const dataRes = await prisma.lesson.findMany({
    where: {
      teacherId: user.id,
    },
  });
  const vacations = await prisma.vacation.findMany();
  const recursiveEvents = generateRecurringEvents(dataRes, vacations);

  return (
    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
      <div className="flex flex-col gap-8 xl:w-2/3">
        <div className="flex flex-1 flex-col rounded-2xl bg-background p-4 not-first:gap-1">
          <div className="text-xl font-semibold text-text-highlight">
            Schedule
          </div>
          <div className="max-h-[750px] grow overflow-y-auto">
            <BigCalendar events={recursiveEvents} />
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex w-full flex-col gap-8 xl:w-1/3">
        <Announcements />
      </div>
    </div>
  );
}
