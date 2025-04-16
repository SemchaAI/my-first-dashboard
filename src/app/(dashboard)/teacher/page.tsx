import { Announcements, BigCalendar } from "@/components/entities";

export default function TeacherPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
      <div className="flex flex-col gap-8 xl:w-2/3">
        <div className="flex flex-1 flex-col rounded-2xl bg-background p-4 not-first:gap-1">
          <div className="text-xl font-semibold text-text-highlight">
            Schedule
          </div>
          <div className="max-h-[750px] grow overflow-y-auto">
            <BigCalendar />
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
