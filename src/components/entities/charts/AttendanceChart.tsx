"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";

import { Header } from "@/components/features";
import { API_ROUTES, ApiError } from "@/utils/config";

const initData = [
  {
    name: "Mon",
    present: 0,
    absent: 0,
  },
  {
    name: "Tue",
    present: 0,
    absent: 0,
  },
  {
    name: "Wed",
    present: 0,
    absent: 0,
  },
  {
    name: "Thu",
    present: 0,
    absent: 0,
  },
  {
    name: "Fri",
    present: 0,
    absent: 0,
  },
];
export const AttendanceChart = () => {
  const [data, setData] = useState(initData);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_ROUTES.ATTENDANCE);
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
  }, []);

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-background p-4">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Ellipsis size={28} className="cursor-pointer stroke-text-primary" />
      </div> */}
      <Header title="Attendance" icon />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#99a1af"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#99a1af" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#99a1af" }} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: "#99a1af",
            }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: 20, paddingBottom: 20 }}
          />
          <Bar
            dataKey="absent"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="present"
            fill="#FAE27C"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
