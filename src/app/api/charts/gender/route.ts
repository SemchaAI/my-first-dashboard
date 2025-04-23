import { prisma } from "@/prisma/prismaClient";
import { UnauthorizedError } from "@/utils/config";
import { getUserSession } from "@/utils/helpers";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user) throw new UnauthorizedError();

    const data = await prisma.student.groupBy({
      by: ["sex"],
      _count: true,
    });

    const boys = data.find((d) => d.sex === "MALE")?._count || 0;
    const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

    return NextResponse.json({ boys, girls });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Something went wrong";
    console.error(`[GET GENDERS] Server error: ${msg}`);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
