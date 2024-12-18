"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const UserEditModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const { data: session } = useSession();
  const email = session?.user?.email;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name") as string;
      const surname = formData.get("surname") as string;
      const phone = formData.get("phone") as string;
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      if (
        !name &&
        !surname &&
        !phone &&
        !username &&
        !password &&
        !confirmPassword
      ) {
        setShowModal(false);
        setError("");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const phoneRegex = /^[0-9]{9}$/;
      if (phone && !phoneRegex.test(phone)) {
        setError("Phone number must be 9 digits.");
        return;
      }

      setError(""); // Reset error message

      const res = await fetch("/api/editUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          surname,
          phone,
          username,
          password,
          email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message);
        setTimeout(() => {
          location.reload();
          setShowModal(false);
        }, 2000);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.log("Error during updating profile.", error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleShowModal}
        className="bg-green-500 font-semibold px-4 py-2 mt-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Edit Profile
      </button>
      {showModal && (
        <div className="fixed inset-0 text-black bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-gray-200 p-6 rounded-lg lg:w-1/3 md:w-10/12">
            <button
              onClick={() => {
                setShowModal(false);
                setError("");
              }}
              className="absolute top-3 right-3 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
            <h3 className="font-semibold mb-6">Change your profile data</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={session?.user?.name}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  defaultValue={session?.user?.surname}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  defaultValue={session?.user?.phone}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={session?.user?.username}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter new password (only if you want to change it)"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />

                {error && (
                  <div className="bg-red-500 text-text text-sm w-fit py-1 px-3 mt-2 rounded-md">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-500 text-text text-sm w-fit py-1 px-3 mt-2 rounded-md">
                    {successMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-green-500 w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-text px-4 py-2 rounded-lg"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEditModal;
