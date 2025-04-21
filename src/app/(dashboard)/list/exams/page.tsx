import { Filter, Plus, SortDesc } from "lucide-react";

import { prisma } from "@/prisma/prismaClient";
import { Pagination, Search } from "@/components/features";
import { Table } from "@/components/entities";

import type { TSearchParams } from "@/utils/models/global";
import { columns, renderRow } from "./tableConfig";
import { getUserSession } from "@/utils/helpers";
import { Role } from "@prisma/client";

export default async function ExamsList({
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
    classId,
    teacherId,
  } = await searchParams;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  //query params end

  const { result, count } = await prisma.exam.paginate({
    page: pageNum,
    limit: limitNum,
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        {
          lesson: {
            subject: {
              name: { contains: search, mode: "insensitive" },
            },
          },
        },
      ],
      lesson: {
        ...(user.role === Role.TEACHER
          ? { teacherId: user.id }
          : { teacherId: teacherId }),
        ...(user.role === Role.STUDENT && {
          class: {
            students: { some: { id: user.id } },
          },
        }),
        ...(user.role === Role.PARENT && {
          class: {
            students: { some: { parentId: user.id } },
          },
        }),
        ...(classId && { classId: parseInt(classId) }),
      },
    },
    include: {
      lesson: {
        select: {
          subject: { select: { name: true } },
          class: { select: { name: true } },
          teacher: { select: { name: true, surname: true } },
        },
      },
    },
  });

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-background p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold text-text-highlight md:block">
          All Exams
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
