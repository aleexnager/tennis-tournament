import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Tournament from "@/models/tournament";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const tournament_id = searchParams.get("tournament_id");

    if (!tournament_id) {
      return NextResponse.json(
        { error: "Missing tournament_id" },
        { status: 400 }
      );
    }

    const tournament = await Tournament.findById(tournament_id);

    if (!tournament) {
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ tournament }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
