import {
  Announcements,
  BigCalendar,
  PerformancePieChart,
} from "@/components/entities";
import { Calendar, DropletIcon, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StudentPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="flex w-full flex-col gap-4 xl:w-2/3">
        {/* teacher main data */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          {/* teacher card */}
          <div className="flex flex-1 gap-4 rounded-md bg-primary px-4 py-6">
            <div className="w-1/2 sm:w-1/3">
              <Image
                src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="aspect-square rounded-full object-cover"
              />
            </div>
            <div className="flex w-1/2 flex-col justify-between gap-4 sm:w-2/3">
              <div>
                <h1 className="text-xl font-semibold text-text-highlight">
                  Cameron Moran
                </h1>
                <p className="text-sm text-text-primary">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="flex flex-wrap justify-between gap-y-2 text-xs font-medium text-text-highlight">
                <div className="flex w-full items-center gap-1 md:w-1/2">
                  <DropletIcon size={14} className="stroke-text-highlight" />
                  <span>A+</span>
                </div>
                <div className="flex w-full items-center gap-1 md:w-1/2">
                  <Calendar size={14} className="stroke-text-highlight" />
                  <span>January 2025</span>
                </div>

                <div className="flex w-full items-center gap-1 md:w-1/2">
                  <Mail size={14} className="stroke-text-highlight" />
                  <span>user@gmail.com</span>
                </div>
                <div className="flex w-full items-center gap-1 md:w-1/2">
                  <Phone size={14} className="stroke-text-highlight" />
                  <span>+373 234 567</span>
                </div>
              </div>
            </div>
          </div>
          {/* statistic cardList */}
          <div className="flex flex-1 flex-wrap gap-4">
            <div className="flex w-full gap-4 rounded-md bg-background p-4 md:w-[calc(50%-0.5rem)]">
              <Image
                src="/static/img/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-text-secondary">Attendance</span>
              </div>
            </div>
            <div className="flex w-full gap-4 rounded-md bg-background p-4 md:w-[calc(50%-0.5rem)]">
              <Image
                src="/static/img/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-text-secondary">Grade</span>
              </div>
            </div>
            <div className="flex w-full gap-4 rounded-md bg-background p-4 md:w-[calc(50%-0.5rem)]">
              <Image
                src="/static/img/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div>
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-text-secondary">Lessons</span>
              </div>
            </div>
            <div className="flex w-full gap-4 rounded-md bg-background p-4 md:w-[calc(50%-0.5rem)]">
              <Image
                src="/static/img/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-text-secondary">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM CHART*/}
        <div className="flex flex-1 flex-col rounded-2xl bg-background p-4 not-first:gap-1">
          <div className="text-xl font-semibold text-text-highlight">
            <h1>Student&apos;s Schedule</h1>
          </div>
          <div className="max-h-[750px] grow overflow-y-auto">
            <BigCalendar />
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
