"use client";
import { Header } from "@/components/features";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 3300,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 3300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 3300,
  },
  {
    name: "Nov",
    income: 4000,
    expense: 3300,
  },
  {
    name: "Dec",
    income: 4300,
    expense: 3300,
  },
];

// interface IProps {}

export const FinanceChart = () => {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-background p-4">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Ellipsis size={28} className="cursor-pointer stroke-text-primary" />
      </div> */}
      <Header title="Finance" icon />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#99a1af" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#99a1af" }}
            tickLine={false}
            tickMargin={10}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: "#99a1af",
            }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: 10, paddingBottom: 30 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#CFCEFF"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#C3EBFA"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
