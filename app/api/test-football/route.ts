import { NextResponse } from "next/server";
import { footballFetch } from "@/src/lib/football-data";

export async function GET() {
  const data = await footballFetch("/competitions/WC/matches");

  return NextResponse.json(data);
}