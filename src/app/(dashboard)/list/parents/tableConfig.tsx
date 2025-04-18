import Link from "next/link";
import { Eye, Trash } from "lucide-react";
import type { Role } from "@prisma/client";
import type { ParentList } from "@/utils/models/tables";

const getColumns = (role: Role) => [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student Names",
    accessor: "students",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  ...(role === "ADMIN"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];

const renderRow = (item: ParentList, role: Role) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-secondary-highlight"
  >
    <td className="flex items-center gap-4 py-4 pr-2 pl-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.user.email}</p>
      </div>
    </td>
    <td className="hidden px-2 py-0.5 md:table-cell">
      {item.students.map((student) => student.name).join(", ")}
    </td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.phone}</td>
    <td className="hidden px-2 py-0.5 text-xs md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link
          href={`/list/teachers/${item.id}`}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary"
        >
          <Eye size={16} className="stroke-background" />
        </Link>
        {role === "ADMIN" && (
          <>
            <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-secondary">
              <Trash size={16} className="stroke-background" />
            </button>
          </>
        )}
      </div>
    </td>
  </tr>
);

export { getColumns, renderRow };
