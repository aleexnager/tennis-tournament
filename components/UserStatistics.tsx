"use client";

import { useSession } from "next-auth/react";

const UserStatistics = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <div className="space-y-2 p-4">
        <p>
          Total points:{" "}
          <span className="font-medium">{session?.user?.total_points}</span>
        </p>
        <p>
          Total sets won:{" "}
          <span className="font-medium">{session?.user?.total_sets_won}</span>
        </p>
        <p>
          Total games won:{" "}
          <span className="font-medium">{session?.user?.total_games_won}</span>
        </p>
        <p>
          Total games lost:{" "}
          <span className="font-medium">{session?.user?.total_games_lost}</span>
        </p>
        <p>
          Global ranking: <span className="font-medium">1</span>
        </p>
      </div>
    </div>
  );
};

export default UserStatistics;
