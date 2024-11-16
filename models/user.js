import mongoose, { models, Schema } from "mongoose";

//Modelo de un usuario.
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["player", "admin"],
      default: "player",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    validationToken: {
      type: String,
      required: false,
    },
    resetToken: {
      type: String,
      default: null,
      required: false,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
      required: false,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;