import Link from "next/link";
import { Eye, Trash } from "lucide-react";
import { Role } from "@prisma/client";
import type { AnnouncementList, IColumn } from "@/utils/models/tables";

const columns: IColumn[] = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    role: Role.ADMIN,
  },
];

const renderRow = (item: AnnouncementList, role: Role) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-secondary-highlight"
  >
    <td className="py-4 pr-2 pl-4">{item.title}</td>
    <td className="px-2 py-0.5">{item.class?.name}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">
      {item.date.toLocaleDateString()}
    </td>
    {role === Role.ADMIN && (
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
    )}
  </tr>
);

export { columns, renderRow };
