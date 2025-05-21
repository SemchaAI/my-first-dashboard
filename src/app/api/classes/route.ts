import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
import type { IClassResponse } from "@/utils/models/response";

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: { _count: { select: { students: true } } },
    });
    if (!classes)
      return NextResponse.json<IClassResponse>(
        { message: "No classes found", isSuccess: false },
        { status: 404 },
      );
    //temporal Simulate a 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //
    return NextResponse.json<IClassResponse>(
      { classes, message: "Success", isSuccess: true },
      { status: 200 },
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Something went wrong";
    console.error(`[GET CLASSES] Server error: ${msg}`);
    return NextResponse.json<IClassResponse>(
      { message: "Server error", isSuccess: false },
      { status: 500 },
    );
  }
}
