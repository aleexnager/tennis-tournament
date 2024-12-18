import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/config/authOptions";

export default async function Register() {
  const session = await getServerSession(authOptions);
  console.log("session: ", session);

  if (session) redirect("/dashboard");

  return (
    <main>
      <RegisterForm />
    </main>
  );
}
