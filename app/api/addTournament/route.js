import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Tournament from '@/models/tournament';

export async function POST(req) {
  const { name, start_date, end_date, inscription_limit_date, max_num_participants, active } = await req.json();

  try {
    await connectDB();

    // Encuentra al usuario por username
    const tournament = await Tournament.findOne({ name });
    if (tournament) {
      return NextResponse.json({ message: 'Tournament already exists' }, { status: 400 });
    }

    const newTournament = new Tournament({
      name,
      start_date,
      end_date,
      inscription_limit_date,
      max_num_participants,
      active,
    });

    await newTournament.save();

    return NextResponse.json({ message: 'Tournament created successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error creating tournament:', error);
    return NextResponse.json({ message: 'ERROR: Error creating tournament' }, { status: 500 });
  }
}