import { prisma } from "@/prisma/prismaClient";
import { Filter, Plus, SortDesc } from "lucide-react";

import { Pagination, Search } from "@/components/features";
import { StudentModalForm, Table } from "@/components/entities";

import type { TSearchParams } from "@/utils/models/global";
import { columns, renderRow } from "./tableConfig";
import { getUserSession } from "@/utils/helpers";

export default async function StudentsList({
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
  } = await searchParams;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  //query params end

  const { result, count } = await prisma.student.paginate({
    page: pageNum,
    limit: limitNum,
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        {
          user: { username: { contains: search, mode: "insensitive" } },
        },
      ],
      ...(teacherId
        ? {
            class: {
              lessons: {
                some: {
                  teacherId: teacherId,
                },
              },
            },
          }
        : {}),
    },
    include: {
      class: true,
      user: { select: { username: true, avatar: true } },
    },
  });

  // const grades = await prisma.grade.findMany({
  //   select: { id: true, level: true },
  // });
  // const classes = await prisma.class.findMany({
  //   include: { _count: { select: { students: true } } },
  // });

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-background p-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold text-text-highlight md:block">
          All students
        </h1>

        {/* controls */}
        <div className="flex grow flex-col gap-4 md:grow-0 md:flex-row md:items-center">
          <Search />
          <div className="flex items-center justify-end gap-4 md:justify-start">
            <button className="flex items-center rounded-full bg-tertiary p-2">
              <Filter size={14} className="stroke-text-highlight" />
            </button>
            <button className="flex items-center rounded-full bg-tertiary p-2">
              <SortDesc size={14} className="stroke-text-highlight" />
            </button>
            {/* <button className="flex items-center rounded-full bg-tertiary p-2">
              <Plus size={14} className="stroke-text-highlight" />
            </button> */}
            {user.role === "ADMIN" && (
              <StudentModalForm
                type="Create"
                button={
                  <Plus
                    size={30}
                    className="rounded-full bg-tertiary stroke-text-highlight p-2"
                  />
                }
              />
            )}
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
      <Pagination count={count} currPage={pageNum} limit={limitNum} />
    </div>
  );
}
