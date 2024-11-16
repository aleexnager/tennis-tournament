import { connectDB } from "@/lib/mongodb";
import Tournament from "@/models/tournament";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectDB();

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Tournament name not found" },
        { status: 400 }
      );
    }

    const deletedTournament = await Tournament.findOneAndDelete({ name });

    if (!deletedTournament) {
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tournament deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the tournament" },
      { status: 500 }
    );
  }
}
