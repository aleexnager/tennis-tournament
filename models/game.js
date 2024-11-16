import mongoose, { models, Schema } from "mongoose";

//Modelo de un sólo juego para un solo torneo. En un set (set.js) habrá varios juegos.
const gameSchema = new Schema(
  {
    tournament_id: {
      type: Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    user1_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    round: {
      type: Number,
      required: true,
    },
    winner_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Game = models.Game || mongoose.model("Game", gameSchema);

export default Game;