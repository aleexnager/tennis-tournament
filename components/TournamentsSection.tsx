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
  const [currentDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log("Fetching tournaments...");
    const fetchTournaments = async () => {
      try {
        const res = await fetch("/api/getTournaments");
        if (!res.ok) throw new Error("Error fetching tournaments");

        const data = await res.json();
        setTournaments(data.tournaments);
      } catch (err) {
        console.error("Failed to fetch tournaments:", err);
      }
    };

    fetchTournaments();
  }, []);

  //region filters
  const filterCurrentTournaments = (tournament: Tournament) => {
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    // Filtro para torneos activos
    return tournament.active;
  };

  const filterUpcomingTournaments = (tournament: Tournament) => {
    const oneMonthLater = new Date();
    const endDate = new Date(tournament.end_date);

    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    // Filtro para torneos inactivos y cuya fecha de fin no haya pasado
    return !tournament.active && endDate > currentDate;
  };

  const filterPastTournaments = (tournament: Tournament) => {
    const endDate = new Date(tournament.end_date);

    // Filtro para torneos inactivos y cuya fecha de fin ya haya pasado
    return !tournament.active && endDate < currentDate;
  };
  //endregion

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
            .filter(filterCurrentTournaments) // Filtramos los torneos activos
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
            .filter(filterUpcomingTournaments) // Filtramos los torneos inactivos
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
            .filter(filterPastTournaments) // Filtramos los torneos inactivos
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
