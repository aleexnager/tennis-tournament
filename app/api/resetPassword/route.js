import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { token, email, password } = await req.json();

  try {
    await connectDB();

    // Encuentra al usuario por email y token de restablecimiento
    const user = await User.findOne({ email, resetToken: token });
    if (!user || user.resetTokenExpiry < Date.now()) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    // Encripta la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ message: 'ERROR: Error resetting password' }, { status: 500 });
  }
}