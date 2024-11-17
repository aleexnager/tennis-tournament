"use client";

import React, { useEffect, useState, Suspense } from "react";
//import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import TournamentPlayersList from "./TournamentPlayersList";

interface Tournament {
  name: string;
}

const TournamentsSection: React.FC = () => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const tournament_id = searchParams.get("tournament_id");
  const router = useRouter();

  //const { data: session } = useSession();
  //const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    if (!tournament_id) {
      setError("Tournament ID is missing.");
      setLoading(false);
      return;
    }

    const fetchTournamentData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/getTournament?tournament_id=${tournament_id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching tournament data");
        }
        const data = await response.json();
        setTournament(data.tournament);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos del torneo. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentData();
  }, [tournament_id]);

  if (loading)
    return <p className="text-center">Cargando datos del torneo...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="xl:my-12 p-10">
      <h1 className="text-center text-4xl font-semibold mb-8">
        {tournament ? tournament.name : "Torneo no encontrado"}
      </h1>

      <div className="p-8 space-y-8">
        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Participant List
        </h2>
        <TournamentPlayersList />

        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Rounds
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

const TournamentSectionWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TournamentsSection />
    </Suspense>
  );
};

export default TournamentSectionWithSuspense;
