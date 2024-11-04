"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/models/user";
import UserEditModal from "./UserEditModal";

const UserInfo = () => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  const password = session?.user?.password;

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //ir al modal de edición de perfil UserEditModal y pasarle los datos del usuario usando router.push
    router.push("/UserEditModal");

    /*const res = await fetch("/api/editProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Name",
        surname: "New Surname",
        phone: "New Phone",
        username: "New Username",
        password: "New Password",
      }),
    });
    const data = await res.json();
    console.log(data);*/
  };

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
      <div className="space-y-2 p-4">
        <p>
          Username:{" "}
          <span className="font-medium">{session?.user?.username}</span>
        </p>
        <p>
          Name: <span className="font-medium">{session?.user?.name}</span>
        </p>
        <p>
          Surname: <span className="font-medium">{session?.user?.surname}</span>
        </p>
        <p>
          Email: <span className="font-medium">{session?.user?.email}</span>
        </p>
        <p>
          Phone: <span className="font-medium">{session?.user?.phone}</span>
        </p>
      </div>
      <div className="flex justify-around">
        <UserEditModal />
        <button
          onClick={() => signOut()}
          className="bg-red-500 font-semibold px-4 py-2 mt-6 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
