"use client";
import { useState } from "react";
import { Calendar, momentLocalizer, type View } from "react-big-calendar";
import moment from "moment";

import type { IEvent } from "@/utils/models/calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
export const BigCalendar = ({ events }: { events: IEvent[] }) => {
  const [range, setRange] = useState<View>("work_week");
  const handleChangeView = (view: View) => {
    setRange(view);
  };
  return (
    <Calendar
      localizer={localizer}
      events={events}
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
