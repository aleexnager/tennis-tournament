import React from "react";
import UserInfo from "./UserInfo";

const UsersSection = () => {
  return (
    <section className="xl:mt-12 h-screen">
      <h1 className="flex justify-center text-6xl">User Info</h1>
      <div className="grid place-items-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <UserInfo />
        </div>
      </div>
    </section>
  );
};

export default UsersSection;
