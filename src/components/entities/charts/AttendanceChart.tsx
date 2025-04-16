"use client";
import { Header } from "@/components/features";
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

// interface IProps {}

const data = [
  {
    name: "Mon",
    present: 60,
    absent: 40,
  },
  {
    name: "Tue",
    present: 70,
    absent: 60,
  },
  {
    name: "Wed",
    present: 90,
    absent: 19,
  },
  {
    name: "Thu",
    present: 90,
    absent: 19,
  },
  {
    name: "Fri",
    present: 65,
    absent: 40,
  },
];
export const AttendanceChart = () => {
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
