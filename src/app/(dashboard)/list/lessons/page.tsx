import { Filter, Plus, SortDesc } from "lucide-react";

import { Pagination, Search } from "@/components/features";
import { Table } from "@/components/entities";
import { prisma } from "@/prisma/prismaClient";
import { columns, renderRow } from "./tableConfig";
import { getUserSession } from "@/utils/helpers";

import type { TSearchParams } from "@/utils/models/global";

export default async function LessonsList({
  searchParams,
}: {
  searchParams: TSearchParams;
}) {
  const user = await getUserSession();
  if (!user) return null;
  //query params start
  const {
    page = "1",
    limit = "10",
    search = "",
    teacherId,
    classId,
  } = await searchParams;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  //query params end

  const { result, count } = await prisma.lesson.paginate({
    page: pageNum,
    limit: limitNum,
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        {
          subject: {
            name: { contains: search, mode: "insensitive" },
          },
        },
      ],
      teacherId: teacherId,
      ...(classId && { classId: parseInt(classId) }),
    },
    include: {
      subject: {
        select: { name: true },
      },
      class: {
        select: { name: true },
      },
      teacher: {
        select: { name: true, surname: true },
      },
    },
  });

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-background p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold text-text-highlight md:block">
          All lessons
        </h1>

        {/* controls */}
        <div className="flex grow flex-col gap-4 md:grow-0 md:flex-row md:items-center">
          {/* search */}
          <Search />
          <div className="flex items-center justify-end gap-4 md:justify-start">
            <button className="flex items-center rounded-full bg-tertiary p-2">
              <Filter size={14} className="stroke-text-highlight" />
            </button>
            <button className="flex items-center rounded-full bg-tertiary p-2">
              <SortDesc size={14} className="stroke-text-highlight" />
            </button>
            <button className="flex items-center rounded-full bg-tertiary p-2">
              <Plus size={14} className="stroke-text-highlight" />
            </button>
          </div>
        </div>
      </div>
      {/* list */}
      <Table
        role={user.role}
        columns={columns}
        renderRow={renderRow}
        data={result}
      />
      {/* pagination */}
      <Pagination currPage={pageNum} count={count} limit={limitNum} />
    </div>
  );
}
