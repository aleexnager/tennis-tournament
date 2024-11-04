import { connectDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

// Configuraciones para nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  const { email } = await req.json();
  console.log({ email });

  try {
    await connectDB();

    // Busca el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Genera un token de restablecimiento de contraseña
    const resetToken = uuidv4();
    const resetTokenExpiry = Date.now() + 7200000; // Token válido por 1 hora
    console.log({ resetToken, resetTokenExpiry });

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry; // Token válido por 1 hora
    await user.save();

    // Enlace para restablecer la contraseña
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resetPassword?token=${resetToken}&email=${email}`;

    // Configuración del correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
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
              <h1>UPM Tennis Tournament: reset your password</h1>
              <p>To reset your password, please click the following button:</p>
              <a class="button" href="${resetUrl}">Reset Password</a>
              <p>This link will expire in one hour.</p>
              <p>If you did not request a password reset for this account, please ignore this email.</p>
              <p>Best regards,<br>The UPM Tennis Tournament Team</p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'A reset password email has been sent. Please check your inbox.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return NextResponse.json({ error: 'ERROR: Error sending reset password email' }, { status: 500 });
  }
}
