const Moment = require("moment");
const db = require("../models");

const calculateFee = tenant => {
  console.log("INSIDE FEE");
  console.log("TENANT IS:", tenant);
  const start = Moment.utc(tenant.arrival);
  const end = Moment.utc(tenant.payment);
  const duration = end.diff(start, "minutes");
  console.log("DURATION IS:", duration);
  if (duration <= 60) {
    console.log("duration was less than 60");
    return 3;
  }
  if (duration <= 180) {
    console.log("duration was less than 180");
    return 4.5;
  }
  if (duration <= 360) {
    return 6.75;
  }
  return 10.12;
};

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
  create: function(req, res) {
    db.Lot.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("INSIDE LOT CONTROLLER!!!!");
    console.log("req.body", req.body);
    console.log("id is", req.params.id);
    db.Lot.findOneAndUpdate({ _id: req.params.id }, req.body)
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
  test: function(req, res) {
    console.log("INSIDE TEST");
  },
  getPaymentConfirmation: function(req, res) {
    console.log("INSIDE getPaymentConfirmation");
    console.log("req.params.ticket is:", req.params.ticket);
    const ticket = req.params.ticket;
    console.log("req.params.lotid is:", req.params.lotId);
    const lotId = req.params.lotId;
    db.Lot.findById(lotId)
      .then(lot => {
        console.log("res is:", lot);
        const tenants = lot.tenants;
        const tenant = tenants.find(tenant => {
          console.log("tenant.ticket:", tenant.ticket);
          console.log("ticket:", ticket);
          if (tenant.ticket === ticket) {
            const now = new Date();
            tenant.departure = Moment(now).format("YYYY-MM-DD HH:mm");
            console.log("returning tenant:", tenant);
            return tenant;
          }
        });
        if (!tenant) {
          console.log("tenant is not defined");
          throw "invalid ticket";
        }
        const start = Moment.utc(tenant.payment);
        const end = Moment.utc(tenant.departure);
        const duration = end.diff(start, "minutes");
        console.log("DURATION IS:", duration);
        if (duration < lot.departureLeeway) {
          const payment = {
            lot: lotId,
            ticket: tenant.ticket,
            arrival: tenant.arrival,
            payment: tenant.payment,
            departure: tenant.departure,
            fee: tenant.fee
          };
          console.log("PAYMENT IS,", payment);
          db.Payment.create(payment)
            .then(() => {
              console.log("Payment made!!!!!");
              res.json(true);
            })
            .then(() => {
              db.Lot.findByIdAndUpdate(lotId, {
                $pull: {
                  tenants: { ticket: ticket, departure: null }
                }
              }).then(() => {
                console.log("tenant can leave");
                // res.json(true);
              });
            })
            .catch(err => res.status(422).json(err));
        } else {
          console.log("tenant cannot leave");
          res.json(false);
        }

        // res.json(tenant);
      })
      .catch(err => res.status(404).json(err));
  },

  getTenantPaymentInfo: function(req, res) {
    console.log("INSIDE getTenantPaymentInfo");
    console.log("req.params.ticket is:", req.params.ticket);
    const ticket = req.params.ticket;
    console.log("req.params.lotid is:", req.params.lotId);
    const lotId = req.params.lotId;
    let fee = 0;

    db.Lot.findById(lotId)
      .then(lot => {
        console.log("res is:", lot);
        const tenants = lot.tenants;
        const tenant = tenants.find(tenant => {
          console.log("tenant.ticket:", tenant.ticket);
          console.log("ticket:", ticket);
          if (tenant.ticket === ticket) {
            console.log("returning tenant:", tenant);
            const now = new Date();
            tenant.payment = Moment(now).format("YYYY-MM-DD HH:mm");
            tenant.fee = calculateFee(tenant);
            console.log("TENANT FEE IS:", tenant.fee);
            return tenant;
          }
        });
        if (!tenant) {
          console.log("tenant is not defined");
          throw "invalid ticket";
        }
        console.log("tenant.fee", tenant.fee);
        res.json(tenant);
      })
      .catch(err => res.status(404).json(err));
  },

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
  },
  updateTenant: function(req, res) {
    console.log("inside updateTenant");
    console.log("lotId is:", req.params.lotId);
    const tenant = req.body;
    console.log("tenant is:", req.body);

    db.Lot.findByIdAndUpdate(req.params.lotId, {
      $pull: {
        tenants: { ticket: tenant.ticket, payment: null }
      }
    }).catch(err => res.status(422).json(err));

    db.Lot.findByIdAndUpdate(req.params.lotId, {
      $push: { tenants: tenant }
    }).catch(err => res.status(422).json(err));
  }
};
