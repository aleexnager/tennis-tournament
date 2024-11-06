import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, surname, phone, username, password, email } = await req.json();

  try {
    await connectDB();

    // Encuentra al usuario por username
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    // Comprobar que datos son != de NULL y modificar aquellos con valor
    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (phone) user.phone = phone;
    if (username) user.username = username;
    if (password) {
      // Encripta la nueva contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  }
  catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'ERROR: Error updating profile' }, { status: 500 });
  }
}
