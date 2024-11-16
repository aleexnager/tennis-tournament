import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Participant from "@/models/participant";
import Tournament from "@/models/tournament";

export async function POST(req) {
  try {
    await connectDB();

    const { user_id, tournament_name } = await req.json();

    const tournament = await Tournament.findOne({ name: tournament_name });

    if (!user_id || !tournament._id) {
      return NextResponse.json(
        { error: 'Missing user_id or tournament_name' },
        { status: 400 }
      );
    }

    const participant = await Participant.findOne({
      user_id,
      tournament_id: tournament._id,
    });

    return NextResponse.json({ participant }, { status: 200 });
  } catch (error) {
    console.error('Error fetching participant:', error);
    return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
  }
}