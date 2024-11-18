import LoginForm from "@/components/LoginForm";
import ClientRedirect from "@/components/LoginClientRedirect";

export default async function Home() {
  return (
    <main>
      <LoginForm />
      <ClientRedirect />
    </main>
  );
}
