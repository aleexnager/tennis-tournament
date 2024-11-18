"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login"); // Redirect to the login page after 3 seconds
    }, 1500);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-bg text-text">
      {/* Animated Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin mb-6"></div>

      <h1 className="text-4xl font-bold mb-4">
        Welcome to out Tennis Tournament App!
      </h1>
      <p className="text-lg">Redirecting to login...</p>
    </main>
  );
}
