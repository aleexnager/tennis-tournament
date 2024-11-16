"use client";

import React, { useEffect, useState } from "react";
//import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TournamentPlayersList from "./TournamentPlayersList";

interface Tournament {
  _id: string;
  name: string;
  start_date: string;
  end_date: string;
  inscription_limit_date: string;
  active: boolean;
}

const TournamentsSection: React.FC = () => {
  const router = useRouter();

  //const { data: session } = useSession();
  //const isAdmin = session?.user?.role === "admin";

  return (
    <section className="xl:my-12 p-10">
      <h1 className="text-center text-4xl font-semibold mb-8">{} Tournament</h1>

      <div className="p-8 space-y-8">
        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Players List
        </h2>
        <TournamentPlayersList />

        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Upcoming Tournaments
        </h2>
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"></ul>

        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Past Tournaments
        </h2>
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"></ul>
      </div>

      <div className="flex justify-center">
        <button
          onClick={router.back}
          className="flex justify-center w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go back
        </button>
      </div>
    </section>
  );
};

export default TournamentsSection;
