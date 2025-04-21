import Link from "next/link";
import Image from "next/image";
import { Eye, Trash } from "lucide-react";
import { Role } from "@prisma/client";
import type { StudentList } from "@/utils/models/tables";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    role: [Role.ADMIN],
  },
];
const renderRow = (item: StudentList, role: Role) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-secondary-highlight"
  >
    <td className="flex items-center gap-4 py-4 pr-2 pl-4">
      <Image
        src={item.user.avatar || "/static/img/avatar.png"}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover md:hidden xl:block"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-text-primary">{item.class.name}</p>
      </div>
    </td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.user.username}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.class.name[0]}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.phone}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.address}</td>
    {role === Role.ADMIN && (
      <td>
        <div className="flex items-center gap-2">
          <Link
            href={`/list/students/${item.id}`}
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
