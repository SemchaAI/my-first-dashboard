"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import toast from "react-hot-toast";

import { Header } from "@/components/features";
import { API_ROUTES, ApiError } from "@/utils/config";

// import "react-calendar/dist/Calendar.css";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface IEvent {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
}

export const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [data, setData] = useState<IEvent[]>([]);
  console.log("data", data && data[0]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${API_ROUTES.CALENDAR_EVENTS}?date=${value?.toLocaleString("en-US")}`,
        );
        const json = await res.json();
        if (!res.ok)
          throw new ApiError(
            json.message || "Failed to fetch data",
            res.status,
          );
        setData(json.data);
      } catch (err) {
        const msg =
          err instanceof ApiError ? err.message : "Internal server error";
        console.error("err", err);
        toast.error(msg, { duration: 5000 });
      }
    }
    fetchData();
  }, [value]);
  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl bg-background p-4">
      <Calendar
        className="custom-calendar"
        locale="en-US"
        onChange={onChange}
        value={value}
      />
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
              <span className="text-sm">
                {new Date(Date.parse(item.startTime)).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  },
                )}
              </span>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
