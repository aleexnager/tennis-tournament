import { connectDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();

    const { emailOrUsername } = await req.json();
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    }).select('verified');

    return NextResponse.json({ user });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}