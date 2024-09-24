import React from "react";
import TournamentCard from "./TournamentCard";

const TournamentsSection = () => {
  return (
    <section className="xl:mt-12 h-screen">
      <h1 className="flex justify-center text-6xl">Tournaments</h1>
      <div className="grid place-items-center">
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <TournamentCard />
        </ul>
      </div>
    </section>
  );
};

export default TournamentsSection;
