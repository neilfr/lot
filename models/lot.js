const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lotSchema = new Schema({
  name: String,
  capacity: Number,
  feeFormula: [], // of FeeTier
  departureLeeway: Number,
  tenants: [] // of Tenant
});

const Lot = mongoose.model("Lot", lotSchema);

module.exports = Lot;
