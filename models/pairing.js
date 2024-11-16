import mongoose, { models, Schema } from "mongoose";

//Modelo de un solo emparejamiento para un sólo torneo. En un partido habrá un sólo emparejamiento. En un torneo habrá varios emparejamientos.
const pairingSchema = new Schema(
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
    round_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Pairing = models.Pairing || mongoose.model("Pairing", pairingSchema);

export default Pairing;