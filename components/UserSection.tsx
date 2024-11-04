import React from "react";
import UserInfo from "./UserInfo";
import UserStatistics from "./UserStatistics";
import UserTournaments from "./UserTournaments";
import UserTournamentsInfoTable from "./UserTournamentsInfoTable";

const UserSection = () => {
  return (
    <section className="xl:my-12 py-10">
      <h1 className="text-center text-4xl font-semibold mb-8">
        User Dashboard
      </h1>
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-6 md:grid-cols-1 lg:gap-8 md:gap-12 w-full max-w-6xl px-4">
          <div className="lg:col-span-3 md:col-span-1">
            <UserInfo />
          </div>
          <div className="lg:col-span-3 md:col-span-1">
            <UserStatistics />
          </div>
          <div className="col-span-full">
            <UserTournaments />
          </div>
          <div className="col-span-full">
            <UserTournamentsInfoTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSection;
