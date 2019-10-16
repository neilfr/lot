const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  paymentDate: String,
  paymentAmount: Date,
  lotId: Date
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
