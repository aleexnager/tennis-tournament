import React from "react";
import TournamentManagementAdd from "./TournamentManagementAdd";
import TournamentManagementDelete from "./TournamentManagementDelete";

const TournamentManagement = () => {
  return (
    <div>
      <TournamentManagementAdd />
      <TournamentManagementDelete />
    </div>
  );
};

export default TournamentManagement;

/*Aqui podría tener TournamentManagement y luego TournamentCreate, TournamentEdit (en edit también elimino un torneo)*/
