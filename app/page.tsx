import LoginForm from "@/components/LoginForm";
import LoginClientRedirect from "@/components/LoginClientRedirect";

export default async function Home() {
  return (
    <main>
      <LoginForm />
      <LoginClientRedirect />
    </main>
  );
}
