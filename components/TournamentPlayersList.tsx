"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Participant {
  user_id: {
    name: string;
    surname: string;
    total_points: number;
  };
  total_points: number;
  final_position: number;
}

const TournamentPlayersList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const tournament_id = searchParams.get("tournament_id");

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!tournament_id) return;

      try {
        setLoading(true);
        const response = await fetch(
          `/api/getParticipants?tournament_id=${tournament_id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching participants");
        }
        const data = await response.json();
        setParticipants(data.participants);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los participantes. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [tournament_id]);

  if (loading) return <p className="text-center">Cargando participantes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {participants.length === 0 ? (
        <p className="text-center text-lg">
          There are no participants in this tournament.
        </p>
      ) : (
        <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Players List</h1>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-700 text-text">
              <tr>
                <th className="py-2 px-4 text-center">Player Name</th>
                <th className="py-2 px-4 text-center">
                  Points in this tournament
                </th>
                <th className="py-2 px-4 text-center">
                  Points in all tournaments
                </th>
                <th className="py-2 px-4 text-center">
                  Ranking (points in this tournament)
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {participants.map((participant, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="py-2 px-4 text-center">
                    {participant.user_id.name} {participant.user_id.surname}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {participant.total_points}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {participant.user_id.total_points}
                  </td>
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TournamentPlayersList;
