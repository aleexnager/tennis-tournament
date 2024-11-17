import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Tournament from '@/models/tournament';

export async function POST(req) {
  const { _id, name, start_date, end_date, inscription_limit_date, max_num_participants, active } = await req.json();

  try {
    await connectDB();

    // Encuentra al torneo por nombre
    const tournament = await Tournament.findOne({ _id });
    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 400 });
    }

    if (name) tournament.name = name;
    if (start_date) tournament.start_date = start_date;
    if (end_date) tournament.end_date = end_date;
    if (inscription_limit_date) tournament.inscription_limit_date = inscription_limit_date;
    if (max_num_participants) tournament.max_num_participants = max_num_participants;
    tournament.active = active;

    await tournament.save();

    return NextResponse.json({ message: 'Tournament updated successfully' }, { status: 200 });
  }
  catch (error) {
    console.error('Error creating tournament:', error);
    return NextResponse.json({ message: 'ERROR: Error creating tournament' }, { status: 500 });
  }
}
