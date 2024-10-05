import { connectDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Obtener los parámetros de la URL
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json({ message: 'Invalid confirmation link' }, { status: 400 });
    }

    await connectDB();

    // Buscar al usuario por email y token de validación
    const user = await User.findOne({ email, validationToken: token });

    if (!user) {
      return NextResponse.json({ message: 'Invalid token or email' }, { status: 400 });
    }

    // Verificar si ya está confirmado
    if (user.verified) {
      return NextResponse.json({ message: 'User already verified' }, { status: 200 });
    }

    // Actualizar el campo verified a true
    user.verified = true;
    user.validationToken = undefined;  // Eliminar el token de validación ya que no se necesita más
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error during email confirmation:', error);
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
