"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import TournamentCardEditModal from "./TournamentCardEditModal";

interface TournamentCardProps {
  _id: string;
  name: string;
  start_date: string;
  end_date: string;
  inscription_limit_date: string;
  max_num_participants: number;
  active: boolean;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  _id,
  name,
  start_date,
  end_date,
  inscription_limit_date,
  max_num_participants,
  active,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await fetch(`/api/getParticipant`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: session?.user._id,
            tournament_name: name,
          }),
        });

        const data = await res.json();

        if (res.ok && data.participant) {
          setIsSubscribed(true); // El usuario está inscrito
        } else {
          setIsSubscribed(false); // El usuario no está inscrito
        }
      } catch (err) {
        console.error("Error checking subscription:", err);
        setIsSubscribed(false); // Manejo de error
      }
    };

    if (session?.user._id) {
      checkSubscription();
    }
  }, [session?.user._id, name]);

  const handleSignUp = async () => {
    try {
      const res = await fetch("/api/addParticipant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: session?.user._id,
          tournament_name: name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/tournaments/tournament");
      } else {
        setError(data.error);
        setTimeout(() => {
          setError(""); // Reset error message
        }, 4000);
      }
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  };

  const handleUnsubscribe = async () => {
    const confirmed = confirm(
      `Are you sure you want to unsubscribe from "${name}"?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch("/api/delParticipant", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: session?.user._id,
          tournament_name: name,
        }),
      });

      if (res.ok) {
        setIsSubscribed(false);
      } else {
        const data = await res.json();
        setError(data.error);
        setTimeout(() => {
          setError(""); // Reset error message
        }, 4000);
      }
    } catch (error) {
      console.error("Error removing participant:", error);
    }
  };

  const handleViewDetails = () => {
    router.push("/tournaments/tournament");
  };

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch("/api/delTournament", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok) {
        location.reload();
      } else {
        setError(data.error);
        setTimeout(() => {
          setError(""); // Reset error message
        }, 4000);
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
    }
  };

  const currentDate = new Date();
  const inscriptionDate = new Date(inscription_limit_date);

  const canSignUp = active && currentDate < inscriptionDate;

  return (
    <div className="relative flex flex-col card bg-gradient-to-br from-primary to-secondary w-full shadow-xl rounded-2xl">
      <div className="absolute top-3 left-3 flex gap-2">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white rounded-lg p-2 hover:bg-red-700"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute top-3 right-3 flex gap-2">
        <TournamentCardEditModal
          _id={_id}
          name={name}
          start_date={start_date}
          end_date={end_date}
          inscription_limit_date={inscription_limit_date}
          max_num_participants={max_num_participants}
          active={active}
        />
      </div>
      <figure className="flex justify-center items-center">
        <Image
          src="/images/tournament_summer.jpg"
          alt="Tournament"
          className="rounded-t-2xl"
          width={600}
          height={300}
        />
      </figure>
      <div className="card-body flex flex-col p-8 text-text">
        <h2 className="card-title text-2xl font-bold pb-6">{name}</h2>
        <p className="text-lg">
          From {new Date(start_date).toLocaleDateString()} to{" "}
          {new Date(end_date).toLocaleDateString()}
        </p>
        <p className="text-sm">
          Inscription limit:{" "}
          {new Date(inscription_limit_date).toLocaleDateString()}
        </p>

        <div className="flex justify-center mt-4">
          {error && (
            <div className="bg-red-500 text-text text-sm w-fit py-2 px-4 mt-2 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          {canSignUp &&
            (isSubscribed ? (
              <button
                onClick={handleUnsubscribe}
                className="bg-gray-800 font-semibold rounded-lg w-full p-3 mt-5 mr-2 hover:shadow-lg hover:font-bold hover:border-2"
              >
                Unsubscribe
              </button>
            ) : (
              <button
                onClick={handleSignUp}
                className="bg-gray-800 font-semibold rounded-lg w-full p-3 mt-5 mr-2 hover:shadow-lg hover:font-bold hover:border-2"
              >
                Sign Up
              </button>
            ))}

          <button
            onClick={handleViewDetails}
            className={`bg-gray-800 font-semibold rounded-lg w-full p-3 mt-5 ${
              canSignUp ? "ml-2" : ""
            } hover:shadow-lg hover:font-bold hover:border-2`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
