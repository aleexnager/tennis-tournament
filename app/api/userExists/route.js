import { connectDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();

    const { phone, email, username } = await req.json();
    const user = await User.findOne({
      $or: [{ email }, { phone }, { username }]
    }).select('email phone username');

    if (user) {
      // Crear un objeto para indicar qué campos están repetidos
      let errorMessage = {};
      if (user.email === email) errorMessage.email = 'Email already in use.';
      if (user.phone === phone) errorMessage.phone = 'Phone number already in use.';
      if (user.username === username) errorMessage.username = 'Username already in use.';

      return NextResponse.json({ error: errorMessage });
    }

    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ error: 'An error occurred while checking if user exists.' });
  }
}
