const db = require("../models");

// Defining methods for the lotController
module.exports = {
  findAll: function(req, res) {
    console.log("INSIDE FIND ALL!!!!");
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
    console.log("INSIDE LOT CONTROLLER!!!!");
    // console.log("req.params.id", req.params.id);
    console.log("req.body", req.body);
    console.log("id is", req.params.id);
    db.Lot.findOneAndUpdate({ _id: req.params.id }, req.body)
      // db.Lot.findOneAndUpdate(req.body._id, req.body)

      .then(dbModel => res.json(dbModel))
      // .catch(err => res.status(422).json(err));
      .catch(err => {
        console.log("error!");
        console.log("err is:", err);
        res.status(422).json(err);
      });
  }

  // ,
  // remove: function(req, res) {
  //   db.Book.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
