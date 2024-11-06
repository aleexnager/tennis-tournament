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

    const hashedPassword = await bycrypt.hash(password, 10);
    await connectDB();

    // Generate a validation token
    const validationToken = uuidv4();

    // Create a new user
    await User.create({
      name,
      surname,
      phone,
      email,
      username,
      password: hashedPassword,
      validationToken,
      total_points: 0,
      total_sets_won: 0,
      total_games_won: 0,
      total_games_lost: 0,
    });

    const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirmAccount?token=${validationToken}&email=${email}`;

    // Send an email to the user
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email validation for Tennis Tournament Web App',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                max-width: 600px;
                margin: auto;
              }
              h1 {
                color: #333;
              }
              p {
                font-size: 16px;
                line-height: 1.5;
                color: #555;
              }
              a.button {
                display: inline-block;
                background-color: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                font-weight: bold;
                margin-top: 10px;
              }
              a.button:hover {
                background-color: #0056b3;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome to UPM Tennis Tournament!</h1>
              <p>Thank you for registering with us. Please confirm your email address by clicking the button below:</p>
              <a class="button" href="${confirmationUrl}">Confirm Email</a>
              <p>If you did not register for this account, please ignore this email.</p>
              <p>Best regards,<br>The UPM Tennis Tournament Team</p>
            </div>
          </body>
        </html>
      `,
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