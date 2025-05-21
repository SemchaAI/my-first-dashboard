import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
import type { ISubjectResponse } from "@/utils/models/response";

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      select: { id: true, name: true },
    });
    if (!subjects)
      return NextResponse.json(
        { message: "No subjects found", isSuccess: false },
        { status: 404 },
      );
    //temporal Simulate a 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //
    return NextResponse.json<ISubjectResponse>(
      { subjects, message: "Success", isSuccess: true },
      { status: 200 },
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Something went wrong";
    console.error(`[GET SUBJECTS] Server error: ${msg}`);
    return NextResponse.json<ISubjectResponse>(
      { message: "Server error", isSuccess: false },
      { status: 500 },
    );
  }
}
