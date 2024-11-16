import mongoose, { models, Schema } from "mongoose";

//Modelo de un torneo.
const tournamentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    inscription_limit_date: {
      type: Date,
      required: true,
    },
    max_num_participants: {
      type: Number,
      default: 16,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Tournament = models.Tournament || mongoose.model("Tournament", tournamentSchema);

export default Tournament;