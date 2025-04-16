import Link from "next/link";
import { Eye, Filter, Plus, SortDesc, Trash } from "lucide-react";

import { prisma } from "@/prisma/prismaClient";
import { Pagination, Search } from "@/components/features";
import { Table } from "@/components/entities";
// import { paginatePrisma } from "@/utils/helpers";

import type { TSearchParams } from "@/utils/models/global";

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

const role = "admin";
const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: ResultList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-secondary-highlight"
  >
    <td className="py-4 pr-2 pl-4">{item.title}</td>
    <td className="px-2 py-0.5">{item.studentName}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.score}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.teacherName}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.className}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">
      {item.startTime.toLocaleDateString()}
    </td>
    <td>
      <div className="flex items-center gap-2">
        <Link
          href={`/list/teachers/${item.id}`}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary"
        >
          <Eye size={16} className="stroke-background" />
        </Link>
        {role === "admin" && (
          <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-secondary">
            <Trash size={16} className="stroke-background" />
          </button>
        )}
      </div>
    </td>
  </tr>
);
export default async function ResultsList({
  searchParams,
}: {
  searchParams: TSearchParams;
}) {
  //query params start
  const {
    page = "1",
    limit = "10",
    search = "",
    studentId,
  } = await searchParams;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  //query params end

  const { result, count } = await prisma.result.paginate({
    limit: limitNum,
    page: pageNum,
    where: {
      OR: [
        { exam: { title: { contains: search, mode: "insensitive" } } },
        {
          student: { name: { contains: search, mode: "insensitive" } },
        },
      ],
      studentId: studentId,
    },
    include: {
      student: { select: { name: true, surname: true } },
      exam: {
        include: {
          lesson: {
            select: {
              teacher: { select: { name: true, surname: true } },
              class: { select: { name: true } },
            },
          },
        },
      },
      assignment: {
        include: {
          lesson: {
            select: {
              teacher: { select: { name: true, surname: true } },
              class: { select: { name: true } },
            },
          },
        },
      },
    },
  });
  const dataRes = result.map((item) => {
    const assessment = item.exam || item.assignment;
    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-background p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold text-text-highlight md:block">
          All results
        </h1>

        {/* controls */}
        <div className="flex grow flex-col gap-4 md:grow-0 md:flex-row md:items-center">
          {/* search */}
          <Search />
          <div className="flex items-center justify-end gap-4 md:justify-start">
            <button className="flex items-center rounded-full bg-tertiary p-2">
              <Filter size={14} className="stroke-text-highlight" />
            </button>
            <button className="flex items-center rounded-full bg-tertiary p-2">
              <SortDesc size={14} className="stroke-text-highlight" />
            </button>
            <button className="flex items-center rounded-full bg-tertiary p-2">
              <Plus size={14} className="stroke-text-highlight" />
            </button>
          </div>
        </div>
      </div>
      {/* list */}
      <Table columns={columns} renderRow={renderRow} data={dataRes} />
      {/* pagination */}
      <Pagination currPage={pageNum} count={count} limit={limitNum} />
    </div>
  );
}
