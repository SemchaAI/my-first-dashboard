import Link from "next/link";
import { Eye, Trash } from "lucide-react";
import { Role } from "@prisma/client";
import type { ExamList } from "@/utils/models/tables";

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    role: [Role.ADMIN, Role.TEACHER],
  },
];

const renderRow = (item: ExamList, role: Role) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-secondary-highlight"
  >
    <td className="py-4 pr-2 pl-4">{item.lesson.subject.name}</td>
    <td className="px-2 py-0.5">{item.lesson.class.name}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td className="hidden px-2 py-0.5 md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(new Date(item.startTime))}
    </td>
    {(role === Role.ADMIN || role === Role.TEACHER) && (
      <td>
        <div className="flex items-center gap-2">
          <Link
            href={`/list/exams/${item.id}`}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary"
          >
            <Eye size={16} className="stroke-background" />
          </Link>
          <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-secondary">
            <Trash size={16} className="stroke-background" />
          </button>
        </div>
      </td>
    )}
  </tr>
);

export { columns, renderRow };
