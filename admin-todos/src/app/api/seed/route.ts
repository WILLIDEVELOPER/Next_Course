import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.todo.deleteMany({ where: { complete: true } }); // delete * from todos

  await prisma.todo.createMany({
    data: [
      { description: "Learn Next.js", complete: false },
      { description: "Learn Prisma", complete: false },
    ],
  });
  return NextResponse.json({ message: "seed executed" });
}
