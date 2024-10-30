"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        emailOrUsername,
        password,
        redirect: false,
      });

      if (!res) {
        setError("An unexpected error occurred.");
        return;
      }

      if (res.error) {
        setError("Invalid Credentials.");
        return;
      }

      if (res.ok) {
        const userResponse = await fetch("/api/getUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailOrUsername }),
        });

        const userData = await userResponse.json();
        console.log("userData: ", userData);

        // Verificar si el usuario está verificado
        if (!userData.user.verified) {
          setError("Your account is not verified. Please check your email.");
          await signOut({ redirect: false });
          return;
        }

        setError(""); // Reset error message

        // Si está verificado, redirige al dashboard
        router.replace("dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setEmailOrUsername(e.target.value)}
            type="text"
            placeholder="Username or Email"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-md"
          />
          <button className="bg-green-500 text-white font-bold cursor-pointer p-2 rounded-md hover:bg-green-600">
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-white text-sm w-fit py-1 px-3 mt-2 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-between">
            <Link
              className="text-blue-500 text-sm mt-3 text-right hover:underline"
              href="/sendResetEmail"
            >
              Forgot password?
            </Link>

            <Link
              className="text-blue-500 text-sm mt-3 text-right hover:underline"
              href="/register"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
