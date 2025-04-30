import { Role } from "@prisma/client";

import type { SubjectList } from "@/utils/models/tables";
import { ModalWithTrigger } from "@/components/features";
import { DeleteButton, SubjectForm, UpdateButton } from "@/components/entities";
import { prisma } from "@/prisma/prismaClient";

const subjectTeachers = await prisma.teacher.findMany({
  select: { id: true, name: true, surname: true },
});

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
          <ModalWithTrigger button={<UpdateButton />}>
            <SubjectForm
              type="Update"
              data={{
                name: item.name,
                id: item.id,
                teachers: subjectTeachers.map((t) => t.id),
              }}
            />
          </ModalWithTrigger>
          <ModalWithTrigger button={<DeleteButton />}>
            <SubjectForm
              type="Delete"
              data={{
                name: item.name,
                id: item.id,
                teachers: [],
              }}
            />
          </ModalWithTrigger>
        </div>
      </td>
    )}
  </tr>
);

export { columns, renderRow, subjectTeachers };
