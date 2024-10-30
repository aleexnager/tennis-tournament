"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SendRecoveryEmailForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email) {
      setIsLoading(false);
      setError("An email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Reset error message

    try {
      const res = await fetch("/api/sendResetEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.error) {
        setIsLoading(false);
        setError(data.error);
        return;
      }

      if (data.message) {
        setIsLoading(false);
        setSuccessMessage(data.message);
        const form = e.target as HTMLFormElement;
        form.reset();
        setTimeout(() => {
          router.push("/");
        }, 8000);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error sending a recovery email.", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500">
        <h1 className="text-xl font-bold my-4">Forgot your password?</h1>
        <p className="pb-5 text-text">Please enter your email account.</p>

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            className="bg-green-500 text-white font-bold cursor-pointer p-2 rounded-md hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white inline-flex"
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
            Send Recovery Email
          </button>

          {error && (
            <div className="bg-red-500 text-white text-sm w-fit py-1 px-3 mt-2 rounded-md">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-500 text-white text-sm w-fit py-1 px-3 mt-2 rounded-md">
              {successMessage}
            </div>
          )}

          <div className="flex justify-between">
            <Link
              className="text-blue-500 text-sm mt-3 text-right hover:underline"
              href="/"
            >
              Login
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

export default SendRecoveryEmailForm;
