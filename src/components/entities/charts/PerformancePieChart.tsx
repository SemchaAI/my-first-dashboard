"use client";
import { Header } from "@/components/features";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

export const PerformancePieChart = () => {
  return (
    <div className="flex h-80 w-full flex-col rounded-md bg-background p-4">
      <Header title="Performance" />

      <div className="relative h-full w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="60%"
              innerRadius={70}
              fill="#8884d8"
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-3xl font-bold text-text-highlight">9.2</h1>
          <p>of 10 TS</p>
        </div>
        <h2 className="absolute right-0 bottom-16 left-0 text-center font-medium text-text-highlight">
          1st Semester - 2nd Semester
        </h2>
      </div>
    </div>
  );
};
