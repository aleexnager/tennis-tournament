import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Participant from "@/models/participant";
import Tournament from "@/models/tournament";

export async function DELETE(req) {
  try {
    await connectDB();

    const { user_id, tournament_name } = await req.json();

    if (!user_id || !tournament_name) {
      return NextResponse.json(
        { error: "Missing user_id or tournament_name" },
        { status: 400 }
      );
    }

    // Encuentra el torneo por nombre para obtener su ID
    const tournament = await Tournament.findOne({ name: tournament_name });
    if (!tournament) {
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 }
      );
    }

    // Elimina al participante
    const deletedParticipant = await Participant.findOneAndDelete({
      user_id,
      tournament_id: tournament._id,
    });

    if (!deletedParticipant) {
      return NextResponse.json(
        { error: "Participant not found in this tournament" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Unsubscribed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing participant:", error);
    return NextResponse.json(
      { error: "An error occurred while unsubscribing" },
      { status: 500 }
    );
  }
}
