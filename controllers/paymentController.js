const db = require("../models");

// Defining methods for the paymentsController
module.exports = {
  findAll: function(req, res) {
    db.Payment.find(req.query)
      .then(dbModel => {
        console.log("getting payment data");
        console.log("payment data is:", JSON.stringify(dbModel));
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};
