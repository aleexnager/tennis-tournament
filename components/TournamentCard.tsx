import React from "react";
import Image from "next/image";

interface TournamentCardProps {
  name: string;
  start_date: string;
  end_date: string;
  inscription_limit_date: string;
  active: boolean;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  name,
  start_date,
  end_date,
  inscription_limit_date,
}) => {
  return (
    <div className="flex flex-col card bg-gradient-to-br from-primary to-secondary w-full shadow-xl rounded-2xl">
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
        <div className="flex justify-end pt-6">
          <button className="bg-gray-800 font-semibold rounded-lg w-full p-3 mt-5 hover:shadow-lg hover:font-bold hover:border-2">
            Sing up
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
