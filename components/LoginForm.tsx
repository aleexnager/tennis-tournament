"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        emailOrUsername,
        password,
        redirect: false,
      });

      if (!res) {
        setIsLoading(false);
        setError("An unexpected error occurred.");
        return;
      }

      if (res.error) {
        setIsLoading(false);
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
          setIsLoading(false);
          setError("Your account is not verified. Please check your email.");
          await signOut({ redirect: false });
          return;
        }

        setError(""); // Reset error message

        // Si está verificado, redirige al dashboard
        router.replace("dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500 bg-gray-700">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setEmailOrUsername(e.target.value)}
            type="text"
            placeholder="Username or Email"
            className="p-2 border border-gray-300 rounded-md text-gray-700"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-md text-gray-700"
          />
          <button
            className="bg-green-500 font-bold cursor-pointer p-2 rounded-md hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 inline-flex"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8v2a6 6 0 0 0-6 6z"
                ></path>
              </svg>
            ) : null}
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-sm w-fit py-1 px-3 mt-2 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-between">
            <Link
              className="text-sm mt-3 text-right hover:underline"
              href="/sendResetEmail"
            >
              Forgot password?
            </Link>

            <Link
              className="text-sm mt-3 text-right hover:underline"
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
