import mongoose, { models, Schema } from "mongoose";

//Modelo de un sólo set para un sólo partido. En un partido pueden haber varios sets. Cada set tendrá varios juegos (game.js).
const setSchema = new Schema(
  {
    game_id: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    set_number: {
      type: Number,
      required: true,
    },
    user1_games: {
      type: Number,
      required: true,
    },
    user2_games: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Set = models.Set || mongoose.model("Set", setSchema);

export default Set;