import Link from "next/link";
import { Eye, Trash } from "lucide-react";
import type { Role } from "@prisma/client";
import type { SubjectList } from "@/utils/models/tables";

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: SubjectList, role: Role) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-secondary-highlight"
  >
    <td className="p-4 md:table-cell">{item.name}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">
      {item.teachers.map((teacher) => teacher.name).join(", ")}
    </td>
    <td>
      <div className="flex items-center gap-2">
        <Link
          href={`/list/teachers/${item.id}`}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary"
        >
          <Eye size={16} className="stroke-background" />
        </Link>
        <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-secondary">
          <Trash size={16} className="stroke-background" />
        </button>
      </div>
    </td>
  </tr>
);

export { columns, renderRow };
