"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
  email: string;
  token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  token,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Reset error message

    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message);
        const form = e.target as HTMLFormElement;
        form.reset();
        setTimeout(() => {
          router.push("/");
        }, 8000);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.log("Error during registering.", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500 bg-gray-700">
        <h1 className="text-xl font-bold my-4">Change your password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="New Password"
            className="p-2 border border-gray-300 rounded-md text-gray-700"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="p-2 border border-gray-300 rounded-md text-gray-700"
          />
          <button className="bg-green-500 font-bold cursor-pointer p-2 rounded-md hover:bg-green-600">
            Reset Password
          </button>

          {error && (
            <div className="bg-red-500 text-sm w-fit py-1 px-3 mt-2 rounded-md">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-500 text-sm w-fit py-1 px-3 mt-2 rounded-md">
              {successMessage}
            </div>
          )}

          <div className="flex justify-between">
            <Link
              className="text-sm mt-3 text-right hover:underline"
              href="/login"
            >
              Log In
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

export default ResetPasswordForm;
