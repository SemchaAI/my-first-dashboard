"use client";
import { useState } from "react";
import Calendar from "react-calendar";

import { Header } from "@/components/features";
// import "react-calendar/dist/Calendar.css";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// interface IProps {
// }

const data = [
  {
    id: 1,
    title: "Event 1",
    time: "12:00 PM- 2:00 PM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae.",
  },
  {
    id: 2,
    title: "Event 2",
    time: "12:00 PM- 2:00 PM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae.",
  },
  {
    id: 3,
    title: "Event 3",
    time: "12:00 PM- 2:00 PM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quae.",
  },
];

export const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl bg-background p-4">
      <Calendar
        className="custom-calendar"
        locale="en-US"
        onChange={onChange}
        value={value}
      />
      {/* <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Events</h1>
        <Ellipsis size={28} className="cursor-pointer stroke-text-primary" />
      </div> */}
      <Header title="Events" icon />
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col overflow-hidden rounded-xl border border-t-4 border-border p-4 odd:border-t-primary even:border-t-secondary"
          >
            {/* <span className="absolute top-0 left-0 w-full py-0.5 odd:bg-primary even:bg-secondary" /> */}
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-text-highlight">
                {item.title}
              </h1>
              <span className="text-sm">{item.time}</span>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
