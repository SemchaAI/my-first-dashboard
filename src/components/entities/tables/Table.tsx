import type { IColumn, TableRow } from "@/utils/models/tables";
import type { Role } from "@prisma/client";

type TableProps<T extends TableRow> = {
  role: Role;
  columns: IColumn[];
  data: T[];
  renderRow: (item: T, role: Role) => React.ReactNode;
};

export const Table = <T extends TableRow>({
  columns,
  data,
  renderRow,
  role,
}: TableProps<T>) => {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr className="text-left text-sm text-text-highlight">
          {columns.map((column) => {
            const isAccessible = !column.role || column.role.includes(role);
            if (!isAccessible) return null;
            return (
              <th
                key={column.accessor}
                className={`px-1 ${column.className ? column.className : ""}`}
              >
                {column.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item, role))}</tbody>
    </table>
  );
};
