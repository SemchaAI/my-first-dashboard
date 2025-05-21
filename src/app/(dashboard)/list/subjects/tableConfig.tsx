import { Role } from "@prisma/client";
import { DeleteModal, SubjectModalForm } from "@/components/entities";

import type { SubjectList } from "@/utils/models/tables";
import { Settings, Trash } from "lucide-react";
import { deleteSubject } from "@/utils/actions/forms";

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
    {role === Role.ADMIN && (
      <td>
        <div className="flex items-center gap-2">
          <SubjectModalForm
            type="Update"
            button={
              <Settings
                size={30}
                className="rounded-full bg-primary stroke-background p-2"
              />
            }
            data={{
              name: item.name,
              id: item.id,
              teachers: item.teachers.map((t) => t.id),
            }}
          />
          <DeleteModal
            button={
              <Trash
                size={30}
                className="rounded-full bg-secondary stroke-background p-2"
              />
            }
            title="Delete Subject"
            confirmText="Are you sure you want to delete this subject?"
            id={item.id}
            onDelete={deleteSubject}
          />
        </div>
      </td>
    )}
  </tr>
);

export { columns, renderRow };
