import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Participant from "@/models/participant";
import Tournament from "@/models/tournament";

export async function POST(req) {
  const { user_id, tournament_name } = await req.json();

  try {
    await connectDB();

    const tournament = await Tournament.findOne({ name: tournament_name });

    // Encuentra al participante por user_id y tournament_id
    const participant = await Participant.findOne({
      user_id,
      tournament_id: tournament._id,
    });
    if (participant) {
      return NextResponse.json({ error: 'Participant already sign for this tournament' }, { status: 400 });
    }

    const newParticipant = new Participant({
      user_id,
      tournament_id: tournament._id,
    });

    await newParticipant.save();

    return NextResponse.json({ message: 'Participant created successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error creating participant:', error);
    return NextResponse.json({ message: 'ERROR: Error creating participant' }, { status: 500 });
  }
}
