import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/user';

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