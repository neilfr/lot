const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  lot: Schema.Types.ObjectId,
  ticket: String,
  arrival: Date,
  payment: Date,
  departure: Date,
  fee: Number
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
