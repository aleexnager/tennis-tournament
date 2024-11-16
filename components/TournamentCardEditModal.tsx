"use client";

import React from "react";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/20/solid";

interface TournamentCardEditModalProps {
  _id: string;
  name: string;
  start_date: string;
  end_date: string;
  inscription_limit_date: string;
  max_num_participants: number;
  active: boolean;
}

const TournamentCardEditModal: React.FC<TournamentCardEditModalProps> = ({
  _id,
  name,
  start_date,
  end_date,
  inscription_limit_date,
  max_num_participants,
  active,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //#region formatDate
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extrae la parte de la fecha en formato YYYY-MM-DD
  };

  const formattedStartDate = formatDate(start_date);
  const formattedEndDate = formatDate(end_date);
  const formattedInscriptionLimitDate = formatDate(inscription_limit_date);
  //#endregion

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const updatedTournament = {
        _id,
        name: formData.get("name") as string,
        start_date: formData.get("start_date") as string,
        end_date: formData.get("end_date") as string,
        inscription_limit_date: formData.get(
          "inscription_limit_date"
        ) as string,
        max_num_participants: Number(formData.get("max_num_participants")),
        active: formData.get("active") === "true",
      };

      if (
        !name &&
        !start_date &&
        !end_date &&
        !inscription_limit_date &&
        !max_num_participants &&
        !active
      ) {
        setShowModal(false);
        setError("");
        return;
      }

      if (
        !updatedTournament.name ||
        !updatedTournament.start_date ||
        !updatedTournament.end_date ||
        !updatedTournament.inscription_limit_date ||
        !updatedTournament.max_num_participants ||
        !updatedTournament.active
      ) {
        setError("All fields are required.");
        return;
      }

      setError(""); // Reset error message

      const res = await fetch("/api/editTournament", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTournament),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message);
        setTimeout(() => {
          location.reload();
          setShowModal(false);
        }, 2000);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="">
      <button
        onClick={handleShowModal}
        className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-700"
      >
        <PencilIcon className="h-6 w-6" />
      </button>

      {showModal && (
        <div className="z-20 fixed inset-0 text-black bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-gray-200 p-6 rounded-lg lg:w-1/3 md:w-10/12">
            <button
              onClick={() => {
                setShowModal(false);
                setError("");
              }}
              className="absolute top-3 right-3 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-2">Create Tournament</h2>
            <h3 className="font-semibold mb-6">
              Add all the details to create a new tournament!
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={name}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="start_date">Start date</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  defaultValue={formattedStartDate}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="end_date">End date</label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  defaultValue={formattedEndDate}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="inscription_limit_date">
                  Inscription limit date
                </label>
                <input
                  type="date"
                  id="inscription_limit_date"
                  name="inscription_limit_date"
                  defaultValue={formattedInscriptionLimitDate}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="max_num_participants">
                  Maximun number of participants
                </label>
                <input
                  type="number"
                  id="max_num_participants"
                  name="max_num_participants"
                  defaultValue={max_num_participants}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                <label htmlFor="active">Active</label>
                <select
                  id="active"
                  name="active"
                  defaultValue={active ? "true" : "false"}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                {error && (
                  <div className="bg-red-500 text-text text-sm w-fit py-1 px-3 mt-2 rounded-md">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-500 text-text text-sm w-fit py-1 px-3 mt-2 rounded-md">
                    {successMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-green-500 w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-text px-4 py-2 rounded-lg"
                >
                  Update Tournament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentCardEditModal;
