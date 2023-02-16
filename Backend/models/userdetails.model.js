const mongoose = require("mongoose");

const Usar = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  { collection: "user-data" }
);

const modal = mongoose.model("UserData", Usar);

module.exports = modal;
