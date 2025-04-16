/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/prisma/prismaClient";

type WhereInput<T> = T extends { findMany(args: { where: infer W }): any }
  ? W
  : never;

// Infer the Include type
type Include<T> = T extends { findMany(args: { include: infer I }): any }
  ? I
  : never;

// Infer the returned item type (inside the array from findMany)
type ResultType<T> = T extends {
  findMany: (...args: any[]) => Promise<(infer R)[]>;
}
  ? R
  : never;

export async function paginatePrisma<
  TModel extends { findMany: Function; count: Function },
>(
  model: TModel,
  {
    page = 1,
    limit = 10,
    where,
    include,
  }: {
    page?: number;
    limit?: number;
    where?: WhereInput<TModel>;
    include?: Include<TModel>;
  },
): Promise<{ data: ResultType<TModel>[]; total: number }> {
  const take = limit;
  const skip = (page - 1) * take;

  const [data, total] = await prisma.$transaction([
    model.findMany({ where, include, take, skip }),
    model.count({ where }),
  ]);
  return { data, total };
}
