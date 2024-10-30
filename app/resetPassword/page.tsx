import ResetPasswordForm from "@/components/ResetPasswordForm";
import { redirect } from "next/navigation";
import User from "@/models/user"; // Importa el modelo de usuario
import { connectDB } from "@/lib/mongodb"; // Importa la conexión a la BD

export default async function ResetPassword({ searchParams }: { searchParams: { token: string; email: string } }) {
  const { token, email } = searchParams; // Obtén el token y el email de los parámetros de la URL

  await connectDB(); // Conecta a la base de datos

  // Busca al usuario por email y token
  const user = await User.findOne({ email, resetToken: token });

  // Verifica si el usuario existe y si el token no ha caducado
  if (!user || user.resetTokenExpiry < new Date()) {
    return redirect("/"); // Redirige a una página de error si el token es inválido o caducado
  }

  // Renderiza el formulario de restablecimiento de contraseña
  return (
    <main>
      <ResetPasswordForm email={email} token={token} />
    </main>
  );
}
