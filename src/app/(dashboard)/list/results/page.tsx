import { Filter, Plus, SortDesc } from "lucide-react";

import { prisma } from "@/prisma/prismaClient";
import { Pagination, Search } from "@/components/features";
import { Table } from "@/components/entities";
// import { paginatePrisma } from "@/utils/helpers";

import type { TSearchParams } from "@/utils/models/global";
import { columns, flatResult, renderRow } from "./tableConfig";
import { getUserSession } from "@/utils/helpers";
import { Role } from "@prisma/client";

export default async function ResultsList({
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
    studentId,
  } = await searchParams;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  //query params end

  const { result, count } = await prisma.result.paginate({
    limit: limitNum,
    page: pageNum,
    where: {
      AND: [
        {
          OR: [
            { exam: { title: { contains: search, mode: "insensitive" } } },
            {
              student: { name: { contains: search, mode: "insensitive" } },
            },
          ],
        },
        {
          ...(user.role === Role.TEACHER && {
            OR: [
              { exam: { lesson: { teacherId: user.id } } },
              { assignment: { lesson: { teacherId: user.id } } },
            ],
          }),
        },
      ],
      ...(user.role === Role.STUDENT
        ? { studentId: user.id }
        : { studentId: studentId }),
    },
    include: {
      student: { select: { name: true, surname: true } },
      exam: {
        include: {
          lesson: {
            select: {
              teacher: { select: { name: true, surname: true } },
              class: { select: { name: true } },
            },
          },
        },
      },
      assignment: {
        include: {
          lesson: {
            select: {
              teacher: { select: { name: true, surname: true } },
              class: { select: { name: true } },
            },
          },
        },
      },
    },
  });
  const flatData = flatResult(result);

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-background p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold text-text-highlight md:block">
          All results
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
        data={flatData}
      />
      {/* pagination */}
      <Pagination currPage={pageNum} count={count} limit={limitNum} />
    </div>
  );
}
