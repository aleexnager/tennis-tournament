import { connectDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bycrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bycrypt.hash(password, 10);
    await connectDB();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'ERROR: An error ocurred while registering a user' }, { status: 500 });
  }
}