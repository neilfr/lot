const Moment = require("moment");
const db = require("../models");

const calculateFee = tenant => {
  console.log("INSIDE FEE");
  console.log("TENANT IS:", tenant);
  const start = Moment.utc(tenant.arrival);
  const end = Moment.utc(tenant.payment);
  const duration = end.diff(start, "minutes");
  // const s =
  //   duration._data.hours + " hours " + duration._data.minutes + " minutes ";

  // const duration = start.from(end);
  console.log("DURATION IS:", duration);
  const hours = Math.floor(duration / 60);
  const remainingMinutes = duration - hours * 60;
  const formattedDuration = hours + " hours " + remainingMinutes + " minutes";
  console.log("FORMATTED DURATION IS:", formattedDuration);

  const fee = 100;
  return fee;
};
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
  create: function(req, res) {
    db.Lot.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
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
  },

  remove: function(req, res) {
    db.Lot.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getVacancyCount: function(req, res) {
    console.log("In GETVACANCY COUNT");
    db.Lot.findById(req.params.lotId, "capacity tenants")
      .then(lot => {
        console.log("RES IS:", lot);
        console.log("CAPACITY IS:", lot.capacity);
        console.log("TENANTS IS:", lot.tenants);
        const vacancies = lot.capacity - lot.tenants.length;
        res.json(vacancies);
      })
      .catch(err => res.status(422).json(err));
  },

  getFee: function(req, res) {
    console.log("INSIDE GETFEE");
    console.log("req.params.ticket is:", req.params.ticket);
    const ticket = req.params.ticket;
    console.log("req.params.lotid is:", req.params.lotId);
    const lotId = req.params.lotId;
    db.Lot.findById(lotId, function(err, res) {
      console.log("res is:", res);
      const tenants = res.tenants;
      const x = tenants.find(tenant => {
        console.log("tenant.ticket:", tenant.ticket);
        console.log("ticket:", ticket);
        if (tenant.ticket === ticket) {
          console.log("returning tenant:", tenant);
          const now = new Date();
          tenant.payment = Moment(now).format("YYYY-MM-DD HH:mm");
          tenant.fee = calculateFee(tenant);
          return tenant;
        }
      });
    });
    res.json(100);
  },
  // this is all wrong... but may need the $pull syntax for later
  // findTenantByTicket: function(req, res) {
  //   console.log("IN FIND TENANT BY ID");
  //   console.log("req.params.lotId is:", req.params.lotId);
  //   console.log("req.params.ticket is:", req.params.ticket);
  //   res.json("hello");
  //   db.Lot.findByIdAndUpdate(req.params.lotId, {
  //     $pull: { tenants: { ticket: "1571618449397" } }
  //   });
  // },

  getNewTenant: function(req, res) {
    console.log("INSIDE GETNEWTENANT!!");
    console.log("REQ.PARAMS.ID IS:", req.params.lotId);

    db.Lot.findById(req.params.lotId, "capacity tenants")
      .then(lot => {
        console.log("RES IS:", lot);
        console.log("CAPACITY IS:", lot.capacity);
        console.log("TENANTS IS:", lot.tenants);
        const vacancies = lot.capacity - lot.tenants.length;
        if (vacancies > 0) {
          const now = new Date();
          const newTenant = {
            ticket: Moment(now).format("x"),
            arrival: Moment(now).format("YYYY-MM-DD HH:mm"),
            payment: null,
            departure: null
          };
          db.Lot.findByIdAndUpdate(
            req.params.lotId,
            // { $push: { tenants: { newTenant } } },
            { $push: { tenants: newTenant } },

            () => {
              res.json(newTenant);
            }
          );
        } else {
          res.json(null);
          console.log("no room left");
        }
      })
      .catch(err => res.status(422).json(err));
  }
};
