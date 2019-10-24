const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feeTierSchema = new Schema({
  elapsedMinutes: Number,
  fee: Number
});

const FeeTier = mongoose.model("feeTier", feeTierSchema);

module.exports = FeeTier;
