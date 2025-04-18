import Link from "next/link";
import Image from "next/image";

import { Eye, Trash } from "lucide-react";
import type { Role } from "@prisma/client";
import type { TeacherList } from "@/utils/models/tables";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
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
  },
];

const renderRow = (item: TeacherList, role: Role) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-secondary-highlight"
  >
    <td className="flex items-center gap-4 py-4 pr-2 pl-4">
      <Image
        src={item.img || "/static/img/avatar.png"}
        alt={`${item.name} profile avatar`}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover md:hidden xl:block"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.user.email}</p>
      </div>
    </td>
    <td className="hidden px-2 py-0.5 md:table-cell">{item.id}</td>
    <td className="hidden px-2 py-0.5 md:table-cell">
      {item.subjects.map((subject) => subject.name).join(", ")}
    </td>
    <td className="hidden px-2 py-0.5 md:table-cell">
      {item.classes.map((subject) => subject.name).join(", ")}
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
          <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-secondary">
            <Trash size={16} className="stroke-background" />
          </button>
        )}
      </div>
    </td>
  </tr>
);

export { columns, renderRow };
