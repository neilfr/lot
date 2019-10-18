const db = require("../models");

// Defining methods for the lotsController
module.exports = {
  findAll: function(req, res) {
    db.Lot.find(req.query)
      .then(dbModel => {
        console.log("getting lot data");
        console.log("lot data is:", JSON.stringify(dbModel));
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  // findById: function(req, res) {
  //   db.Book.findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // create: function(req, res) {
  //   db.Book.create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  update: function(req, res) {
    console.log("inside lotscontroller");
    console.log("req.params.id", req.params.id);
    console.log("req.body", req.body);
    // db.Lot.findOneAndUpdate({ _id: req.params.id }, req.body)
    db.Lot.findOneAndUpdate(req.body._id, req.body)

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // ,
  // remove: function(req, res) {
  //   db.Book.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
