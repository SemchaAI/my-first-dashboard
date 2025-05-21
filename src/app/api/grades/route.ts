import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";

export async function GET() {
  try {
    const grades = await prisma.grade.findMany({
      select: { id: true, level: true },
    });
    if (!grades)
      return NextResponse.json(
        { message: "No grades found", isSuccess: false },
        { status: 404 },
      );
    //temporal Simulate a 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //
    return NextResponse.json(
      { grades, message: "Success", isSuccess: true },
      { status: 200 },
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Something went wrong";
    console.error(`[GET GRADES] Server error: ${msg}`);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
