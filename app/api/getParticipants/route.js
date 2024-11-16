import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Participant from "@/models/participant";

export async function GET() {
  try {
    await connectDB();

    const participants = await Participant.find({});

    return NextResponse.json({ participants }, { status: 200 });
  } catch (error) {
    console.error('Error fetching participants:', error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}