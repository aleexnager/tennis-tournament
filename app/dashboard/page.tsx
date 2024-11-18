import UserSection from "@/components/UserSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
  return (
    <main>
      <Navbar />
      <UserSection />
      <Footer />
    </main>
  );
}
