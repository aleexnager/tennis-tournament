import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Participant from "@/models/participant";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const tournament_id = searchParams.get("tournament_id");

    if (!tournament_id) {
      return NextResponse.json(
        { error: "Missing user_id or tournament_name" },
        { status: 400 }
      );
    }

    const participants = await Participant.find({ tournament_id })
      .populate("user_id", "name surname total_points") // Solo los campos necesarios del usuario
      .sort({ total_points: -1 }); // Ordenar por puntos totales

    return NextResponse.json({ participants }, { status: 200 });
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
