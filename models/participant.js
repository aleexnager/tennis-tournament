import mongoose, { models, Schema } from "mongoose";

//Modelo de un sólo participante para un sólo torneo. Para saber si un usuario está participando en un torneo.
const participantSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tournament_id: {
      type: Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    total_points: {
      type: Number,
      required: true,
      default: 0,
    },
    total_sets_won: {
      type: Number,
      required: true,
      default: 0,
    },
    total_games_won: {
      type: Number,
      required: true,
      default: 0,
    },
    total_games_lost: {
      type: Number,
      required: true,
      default: 0,
    },
    final_position: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Participant = models.Participant || mongoose.model("Participant", participantSchema);

export default Participant;