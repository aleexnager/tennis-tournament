import { connectDB } from '@/lib/mongodb';
import Tournament from '@/models/tournament';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const tournaments = await Tournament.find({});
    console.log('tournaments:', tournaments);

    return NextResponse.json({ tournaments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}