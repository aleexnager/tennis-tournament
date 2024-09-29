import React from "react";
import Image from "next/image";

const TournamentCard = ({}) => {
  return (
    <div className="card bg-secondary w-96 shadow-xl rounded-xl">
      <figure className="px-6 pt-6 flex justify-center">
        <Image
          src="/images/tournament2.jpg"
          alt="Tournament"
          className="rounded-xl"
          width={200}
          height={200}
        />
      </figure>
      <div className="card-body items-center text-center py-5">
        <h2 className="card-title font-semibold text-2xl">Tournament!</h2>
        <p className="pt-2">Winter tournament</p>
        <div className="card-actions">
          <button className="bg-primary rounded-md p-3 mt-5 text-text2 font-semibold hover:shadow-lg hover:border-2 hover:border-accent hover:font-bold">
            Sing up
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;