"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const UserEditModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

      if (!name && !surname && !phone && !username && !password) {
        setError("Volver a dashboard");
        return;
      }

      const phoneRegex = /^[0-9]{9}$/;
      if (phone && !phoneRegex.test(phone)) {
        setError("Phone number must be 9 digits.");
        return;
      }

      setError(""); // Reset error message

      const res = await fetch("/api/editProfile", {
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
        <div className="text-black fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-200 p-6 rounded-lg lg:w-1/3 md:w-10/12">
            <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
            <h3 className="font-semibold mb-6">Change your profile data</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
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
