const db = require("../models");

// Defining methods for the tenantsController
module.exports = {
  findAll: function(req, res) {
    db.Tenant.find(req.query)
      .then(dbModel => {
        console.log("getting tenant data");
        console.log("tenant data is:", JSON.stringify(dbModel));
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};
