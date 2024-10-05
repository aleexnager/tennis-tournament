import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/config/authOptions";

export default async function ForgotPassword() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <main>
      <ForgotPasswordForm />
    </main>
  );
}
