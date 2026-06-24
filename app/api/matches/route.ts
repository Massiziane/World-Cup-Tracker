import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const matches = await prisma.match.findMany({
    orderBy: {
      utcDate: "asc",
    },
    include: {
      homeTeam: true,
      awayTeam: true,
    },
  });

  return NextResponse.json(matches);
}