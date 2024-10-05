"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name ||
      !surname ||
      !phone ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be 9 digits.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Reset error message

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, email, username }),
      });

      const { error: userError } = await resUserExists.json();

      if (userError) {
        // Mostrar mensajes específicos para cada campo que esté en conflicto
        let errorMessage = "";
        if (userError.email) errorMessage += `${userError.email}\n`;
        if (userError.phone) errorMessage += `${userError.phone}\n`;
        if (userError.username) errorMessage += `${userError.username}\n`;

        setError(errorMessage.trim());
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          phone,
          email,
          username,
          password,
        }),
      });

      console.log("res", res);

      if (res.ok) {
        setSuccessMessage(
          "A confirmation email has been sent. Please check your inbox."
        );
        const form = e.target as HTMLFormElement;
        form.reset();
        setTimeout(() => {
          router.push("/");
        }, 6000);
      } else {
        setError("User registration failed.");
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registering.", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            placeholder="Surname"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Phone"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="p-2 border border-gray-300 rounded-md"
          />

          <button className="bg-green-500 text-white font-bold cursor-pointer p-2 rounded-md hover:bg-green-600">
            Register
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

          <div className="flex justify-center">
            <Link
              className="text-blue-500 text-sm mt-3 text-right hover:underline"
              href="/"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
