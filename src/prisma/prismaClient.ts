import { PrismaClient } from "@prisma/client";
import { extension } from "prisma-paginate";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(extension);
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
