"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

import { Header } from "@/components/features";
import { API_ROUTES, ApiError } from "@/utils/config";
import toast from "react-hot-toast";

export const GenderChart = () => {
  const [data, setData] = useState([
    { name: "Total", count: 0, fill: "white" },
    { name: "Girls", count: 0, fill: "#FAE27C" },
    { name: "Boys", count: 0, fill: "#C3EBFA" },
  ]);
  const MalePercentage = (data[2].count / data[0].count) * 100 || 0;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_ROUTES.GENDERS);
        const json = await res.json();
        if (!res.ok)
          throw new ApiError(
            json.message || "Failed to fetch data",
            res.status,
          );
        const boys = json.boys ?? 0;
        const girls = json.girls ?? 0;
        setData([
          { name: "Total", count: boys + girls, fill: "white" },
          { name: "Girls", count: girls, fill: "#FAE27C" },
          { name: "Boys", count: boys, fill: "#C3EBFA" },
        ]);
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
      {/* TITLE */}
      {/* <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Students</h1>
        <Ellipsis size={28} className="cursor-pointer stroke-text-primary" />
      </div> */}
      <Header title="Students" icon />
      {/* CHART */}
      <div className="relative h-full w-full">
        <Image
          src="/static/img/maleFemale.png"
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          alt="Gender"
          width={50}
          height={50}
          quality={100}
          priority
          unoptimized
        />
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar
              // label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="count"
            />
            {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col gap-1">
          <div className="h-4 w-4 rounded-full bg-primary" />
          <span className="font-bold text-text-highlight">{data[2].count}</span>
          <p className="text-xs text-text-primary">Male ({MalePercentage}%)</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-4 w-4 rounded-full bg-tertiary" />
          <span className="font-bold text-text-highlight">{data[1].count}</span>
          <p className="text-xs text-text-primary">
            Male ({100 - MalePercentage}%)
          </p>
        </div>
      </div>
    </div>
  );
};

// const style = {
//   top: '50%',
//   right: 0,
//   transform: 'translate(0, -50%)',
//   lineHeight: '24px',
// };
