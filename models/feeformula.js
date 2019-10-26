const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feeformulaSchema = new Schema({
  name: String,
  feeFormula: [
    {
      elapsedMinutes: Number,
      fee: Number
    }
  ]
});

const Feeformula = mongoose.model("feeformula", feeformulaSchema);

module.exports = Feeformula;
