import { prisma } from "@/prisma/prismaClient";
import { UnauthorizedError } from "@/utils/config";
import { getUserSession } from "@/utils/helpers";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserSession();
    if (!user) throw new UnauthorizedError();

    const { searchParams } = new URL(req.url);
    // Extract query parameters
    const date = searchParams.get("date") || "";
    const parsedDate = new Date(Date.parse(date));
    console.log(date);
    const data = await prisma.event.findMany({
      where: {
        startTime: {
          gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
          lte: new Date(parsedDate.setHours(23, 59, 59, 999)),
        },
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Something went wrong";
    console.error(`[GET EVENTS] Server error: ${msg}`);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
