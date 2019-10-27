const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lotdefaultSchema = new Schema({
  name: String,
  capacity: Number,
  departureLeeway: Number,
  feeFormula: [
    {
      elapsedMinutes: Number,
      fee: Number,
      description: String
    }
  ]
});

const Lotdefault = mongoose.model("lotdefault", lotdefaultSchema);

module.exports = Lotdefault;
