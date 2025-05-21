import {
  Announcements,
  BigCalendar,
  EventCalendar,
} from "@/components/entities";
import { bigCalendarEvents, getUserSession } from "@/utils/helpers";

export default async function StudentPage() {
  const user = await getUserSession();
  if (!user) return null;

  // const dataRes = await prisma.lesson.findMany({
  //   where: {
  //     class: { students: { some: { id: user.id } } },
  //   },
  // });

  // const vacations = await prisma.vacation.findMany();
  // const recursiveEvents = generateRecurringEvents(dataRes, vacations);

  const events = await bigCalendarEvents({ type: "userId", id: user.id });
  console.log("events", events);
  return (
    <div className="flex flex-col gap-4 xl:flex-row">
      <div className="flex flex-col gap-8 xl:w-2/3">
        <div className="flex flex-col rounded-2xl bg-background p-4 not-first:gap-1">
          <div className="text-xl font-semibold text-text-highlight">
            Schedule (4A)
          </div>
          <div className="max-h-[750px] grow overflow-y-auto">
            <BigCalendar events={events} />
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex w-full flex-col gap-8 xl:w-1/3">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
