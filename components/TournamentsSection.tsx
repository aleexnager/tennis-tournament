import React from "react";
import TournamentCard from "./TournamentCard";

const TournamentsSection = () => {
  return (
    <section className="xl:my-12 p-10">
      <h1 className="text-center text-4xl font-semibold mb-8">Tournaments</h1>
      <div className="p-8 space-y-8">
        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Current Tournaments
        </h2>
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
        </ul>

        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Upcoming Tournaments
        </h2>
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
        </ul>

        <h2 className="text-2xl font-semibold mb-8 underline hover:font-bold">
          Past Tournaments
        </h2>
        <ul className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
        </ul>
      </div>
    </section>
  );
};

export default TournamentsSection;
