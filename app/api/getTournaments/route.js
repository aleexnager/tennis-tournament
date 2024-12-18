import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Tournament from '@/models/tournament';

export async function GET() {
  try {
    await connectDB();

    const tournaments = await Tournament.find({});

    return NextResponse.json({ tournaments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}