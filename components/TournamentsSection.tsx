"use client";

import React, { useEffect, useState } from "react";
import TournamentCard from "./TournamentCard";
import TournamentManagement from "./TournamentsManagement";
import { useSession } from "next-auth/react";

interface Tournament {
  _id: string;
  name: string;
  start_date: string;
  end_date: string;
  inscription_limit_date: string;
  max_num_participants: number;
  active: boolean;
}

const TournamentsSection: React.FC = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch("/api/getTournaments");
        if (!response.ok) throw new Error("Error fetching tournaments");

        const data = await response.json();
        setTournaments(data.tournaments);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <section className="xl:my-12 p-10">
      <h1 className="text-center text-4xl font-semibold mb-8">Tournaments</h1>

      <div className="p-8 space-y-8">
        {isAdmin && (
          <>
            <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
              Tournament Management
            </h2>
            <TournamentManagement />
          </>
        )}

        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Current Tournaments
        </h2>
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {tournaments
            .filter((tournament) => tournament.active) // Filtramos los torneos activos
            .map((tournament) => (
              <TournamentCard
                key={tournament._id}
                _id={tournament._id}
                name={tournament.name}
                start_date={tournament.start_date}
                end_date={tournament.end_date}
                inscription_limit_date={tournament.inscription_limit_date}
                max_num_participants={tournament.max_num_participants}
                active={tournament.active}
              />
            ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Upcoming Tournaments
        </h2>
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {tournaments
            .filter((tournament) => !tournament.active) // Filtramos los torneos inactivos
            .map((tournament) => (
              <TournamentCard
                key={tournament._id}
                _id={tournament._id}
                name={tournament.name}
                start_date={tournament.start_date}
                end_date={tournament.end_date}
                inscription_limit_date={tournament.inscription_limit_date}
                max_num_participants={tournament.max_num_participants}
                active={tournament.active}
              />
            ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Past Tournaments
        </h2>
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {tournaments
            .filter((tournament) => !tournament.active) // Filtramos los torneos inactivos
            .map((tournament) => (
              <TournamentCard
                key={tournament._id}
                _id={tournament._id}
                name={tournament.name}
                start_date={tournament.start_date}
                end_date={tournament.end_date}
                inscription_limit_date={tournament.inscription_limit_date}
                max_num_participants={tournament.max_num_participants}
                active={tournament.active}
              />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default TournamentsSection;
