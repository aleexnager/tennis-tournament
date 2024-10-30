"use client";

import { useSession, signOut } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
      <div>
        Name: <span className="font-bold">{session?.user?.name}</span>
      </div>
      <div>
        Surname: <span className="font-bold">{session?.user?.surname}</span>
      </div>
      <div>
        Email: <span className="font-bold">{session?.user?.email}</span>
      </div>
      <div>
        Phone: <span className="font-bold">{session?.user?.phone}</span>
      </div>
      <div>
        Username: <span className="font-bold">{session?.user?.username}</span>
      </div>
      <div>
        Total points:{" "}
        <span className="font-bold">{session?.user?.total_points}</span>
      </div>
      <div>
        Total sets won:{" "}
        <span className="font-bold">{session?.user?.total_sets_won}</span>
      </div>
      <div>
        Total games won:{" "}
        <span className="font-bold">{session?.user?.total_games_won}</span>
      </div>
      <div>
        Total games lost:{" "}
        <span className="font-bold">{session?.user?.total_games_lost}</span>
      </div>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white font-bold px-6 py-2 mt-3 rounded-md hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserInfo;
