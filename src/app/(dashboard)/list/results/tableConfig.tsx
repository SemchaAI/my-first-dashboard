import Link from "next/link";
import { Eye, Trash } from "lucide-react";
import type { Role } from "@prisma/client";
import type { ResultList, TResult } from "@/utils/models/tables";

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

const renderRow = (item: ResultList, role: Role) => (
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
        {role === "ADMIN" && (
          <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-secondary">
            <Trash size={16} className="stroke-background" />
          </button>
        )}
      </div>
    </td>
  </tr>
);
const flatResult = (result: TResult[]): ResultList[] =>
  result
    .map((item) => {
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
    })
    .filter((item) => item !== null);

export { columns, renderRow, flatResult };
