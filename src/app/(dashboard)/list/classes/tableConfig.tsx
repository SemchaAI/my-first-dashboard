import Link from "next/link";
import { Eye, Trash } from "lucide-react";
import type { Role } from "@prisma/client";
import type { ClassList } from "@/utils/models/tables";

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: ClassList, role: Role) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-secondary-highlight"
  >
    <td className="py-4 pr-2 pl-4">{item.name}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.capacity}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.name[0]}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">
      {item.supervisor?.name + " " + item.supervisor?.surname || "N/A"}
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

export { columns, renderRow };
