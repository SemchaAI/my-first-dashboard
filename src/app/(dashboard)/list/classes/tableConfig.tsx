import { Settings, Trash } from "lucide-react";
import { Role } from "@prisma/client";
import type { ClassList } from "@/utils/models/tables";
import { ClassModalForm, DeleteModal } from "@/components/entities";
import { deleteClass } from "@/utils/actions/forms";

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
    role: [Role.ADMIN],
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
    {role === Role.ADMIN && (
      <td>
        <div className="flex items-center gap-2">
          <ClassModalForm
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
              capacity: item.capacity,
              grades: item.grades,
              gradeId: item.gradeId,
              supervisorId: item.supervisor?.id,
              teachers: item.teachers,
            }}
          />
          <DeleteModal
            button={
              <Trash
                size={30}
                className="rounded-full bg-secondary stroke-background p-2"
              />
            }
            id={item.id}
            title="Delete class"
            confirmText="Are you sure you want to delete this class?"
            onDelete={deleteClass}
          />
        </div>
      </td>
    )}
  </tr>
);

export { columns, renderRow };
