import React from "react";
import Image from "next/image";

const TournamentCard = ({}) => {
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
        <h2 className="card-title text-2xl font-bold pb-6">Tournament!</h2>
        <p className="text-lg">Winter tournament</p>
        <div className="card-actions flex justify-end pt-6">
          <button className="bg-gray-800 font-semibold rounded-lg w-full p-3 mt-5 hover:shadow-lg hover:font-bold hover:border-2 active:scale-95 transition-transform transform">
            Sing up
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
