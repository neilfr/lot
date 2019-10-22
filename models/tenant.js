const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
  ticket: String,
  arrival: Date,
  payment: Date,
  departure: Date,
  fee: Number
});

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
