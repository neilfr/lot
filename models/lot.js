const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lotSchema = new Schema({
  name: String,
  capacity: Number,
  feeFormula: String,
  tenants: []
});

const Lot = mongoose.model("Lot", lotSchema);

module.exports = Lot;
