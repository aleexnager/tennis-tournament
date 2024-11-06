"use client";

import { useSession, signOut } from "next-auth/react";
import UserEditModal from "./UserEditModal";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
      <div className="space-y-2 p-4">
        <p>
          Name: <span className="font-medium">{session?.user?.name}</span>
        </p>
        <p>
          Surname: <span className="font-medium">{session?.user?.surname}</span>
        </p>
        <p>
          Phone: <span className="font-medium">{session?.user?.phone}</span>
        </p>
        <p>
          Username:{" "}
          <span className="font-medium">{session?.user?.username}</span>
        </p>
        <p>
          Email: <span className="font-medium">{session?.user?.email}</span>
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
