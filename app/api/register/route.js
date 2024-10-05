import { connectDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bycrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

// Configurations for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const { name, surname, phone, email, username, password } = await req.json();
    console.log({ name, surname, phone, email, username, password });

    const hashedPassword = await bycrypt.hash(password, 10);
    await connectDB();

    // Generate a validation token
    const validationToken = uuidv4();

    // Create a new user
    const newUser = await User.create({
      name,
      surname,
      phone,
      email,
      username,
      password: hashedPassword,
      validationToken,
    });
    console.log('newUser:', newUser);

    const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm?token=${validationToken}&email=${email}`;

    // Send an email to the user
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email validation for Tennis Tournament Web App',
      html: `<p>Click <a href="${confirmationUrl}">here</a> to validate your email</p>`,
    };

    await transporter.sendMail(mailOptions);

    // Create a new user
    //await User.create({ name, email, password: hashedPassword, valiadtionToken });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'ERROR: An error ocurred while registering a user', error }, { status: 500 });
  }
}