"use client";
import { useState } from "react";
import { Calendar, momentLocalizer, type View } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

// import "react-big-calendar/lib/addons/dragAndDrop/styles";

export const calendarEvents = [
  {
    title: "Math",
    allDay: false,
    start: new Date(2025, 2, 31, 8, 0),
    end: new Date(2025, 2, 31, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 2, 31, 9, 0),
    end: new Date(2025, 2, 31, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 2, 31, 10, 0),
    end: new Date(2025, 2, 31, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 2, 31, 11, 0),
    end: new Date(2025, 2, 31, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2025, 2, 31, 13, 0),
    end: new Date(2025, 2, 31, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2025, 2, 31, 14, 0),
    end: new Date(2025, 2, 31, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 3, 1, 9, 0),
    end: new Date(2025, 3, 1, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 3, 1, 10, 0),
    end: new Date(2025, 3, 1, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 3, 1, 11, 0),
    end: new Date(2025, 3, 1, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2025, 3, 1, 14, 0),
    end: new Date(2025, 3, 1, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2025, 3, 2, 8, 0),
    end: new Date(2025, 3, 2, 8, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 3, 2, 10, 0),
    end: new Date(2025, 3, 2, 10, 45),
  },

  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2025, 3, 2, 13, 0),
    end: new Date(2025, 3, 2, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2025, 3, 2, 14, 0),
    end: new Date(2025, 3, 1, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 3, 3, 9, 0),
    end: new Date(2025, 3, 3, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 3, 3, 10, 0),
    end: new Date(2025, 3, 3, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 3, 3, 11, 0),
    end: new Date(2025, 3, 3, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2025, 3, 3, 14, 0),
    end: new Date(2025, 3, 3, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2025, 3, 4, 8, 0),
    end: new Date(2025, 3, 4, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 3, 4, 9, 0),
    end: new Date(2025, 3, 4, 9, 45),
  },

  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 3, 4, 11, 0),
    end: new Date(2025, 3, 4, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2025, 3, 4, 13, 0),
    end: new Date(2025, 3, 4, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2025, 3, 4, 14, 0),
    end: new Date(2025, 3, 4, 14, 45),
  },
];

const localizer = momentLocalizer(moment);
export const BigCalendar = () => {
  const [range, setRange] = useState<View>("work_week");
  const handleChangeView = (view: View) => {
    setRange(view);
  };
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={{ agenda: true, day: true, work_week: true }}
      view={range}
      onView={handleChangeView}
      min={new Date(2025, 3, 1, 7, 0)}
      max={new Date(2025, 3, 7, 20, 0)}
      // style={{ height: "96%" }}
    />
  );
};
