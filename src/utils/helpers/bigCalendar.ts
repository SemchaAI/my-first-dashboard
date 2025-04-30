import type { Lesson, Vacation } from "@prisma/client";
import type { IEvent } from "../models/calendar";

const isVacationTime = (date: Date, vacations: Vacation[]) => {
  return vacations.some(
    (vac) => date >= new Date(vac.startDate) && date <= new Date(vac.endDate),
  );
};

export const generateRecurringEvents = (
  lessons: Lesson[],
  vacations: Vacation[],
): IEvent[] => {
  const events: IEvent[] = [];

  // Map string enum to JS weekday number
  const dayToWeekday = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  for (const lesson of lessons) {
    const interval = lesson.repeatInterval || 1;

    const lessonDayIndex = dayToWeekday[lesson.day];
    const baseDate = new Date(lesson.startTime); // We just want time (HH:mm) from here
    const duration = lesson.endTime.getTime() - lesson.startTime.getTime();

    const repeatUntil = lesson.repeatUntil ?? new Date("2025-05-31");

    // Start from 1 month before the lesson start
    const current = new Date();
    current.setMonth(baseDate.getMonth() - 1);
    current.setDate(
      current.getDate() - ((current.getDay() + 7 - lessonDayIndex) % 7),
    );
    current.setHours(baseDate.getHours(), baseDate.getMinutes(), 0, 0);

    while (current <= repeatUntil) {
      if (!isVacationTime(current, vacations)) {
        const start = new Date(current);
        const end = new Date(start.getTime() + duration);

        events.push({
          title: lesson.name,
          start,
          end,
        });
      }

      // Move to same weekday next N weeks
      current.setDate(current.getDate() + 7 * interval);
    }
  }

  return events;
};

// const getLatestMonday = (): Date => {
//   const today = new Date();
//   const dayOfWeek = today.getDay();
//   const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
//   const latestMonday = today;
//   latestMonday.setDate(today.getDate() - daysSinceMonday);
//   return latestMonday;
// };

// export const adjustScheduleToCurrentWeek = (
//   lessons: { title: string; start: Date; end: Date }[],
// ): { title: string; start: Date; end: Date }[] => {
//   const latestMonday = getLatestMonday();

//   return lessons.map((lesson) => {
//     const lessonDayOfWeek = lesson.start.getDay();

//     const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

//     const adjustedStartDate = new Date(latestMonday);

//     adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
//     adjustedStartDate.setHours(
//       lesson.start.getHours(),
//       lesson.start.getMinutes(),
//       lesson.start.getSeconds(),
//     );
//     const adjustedEndDate = new Date(adjustedStartDate);
//     adjustedEndDate.setHours(
//       lesson.end.getHours(),
//       lesson.end.getMinutes(),
//       lesson.end.getSeconds(),
//     );

//     return {
//       title: lesson.title,
//       start: adjustedStartDate,
//       end: adjustedEndDate,
//     };
//   });
// };
