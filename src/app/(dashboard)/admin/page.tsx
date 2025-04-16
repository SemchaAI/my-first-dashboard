import {
  Announcements,
  AttendanceChart,
  EventCalendar,
  FinanceChart,
  GenderChart,
  UserCard,
} from "@/components/entities";

export default function AdminPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:flex-row">
      {/* left */}
      <div className="flex w-full flex-col gap-8 lg:w-2/3">
        {/* user cards   */}
        <ul className="flex flex-wrap justify-between gap-4">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
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
