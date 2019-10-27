const Moment = require("moment");
const db = require("../models");

const calculateFee = (tenant, feeFormula) => {
  const duration = Moment.utc(tenant.payment).diff(
    Moment.utc(tenant.arrival),
    "minutes"
  );
  const qualifyingFeeTier = feeFormula.find(feeTier => {
    return duration < feeTier.elapsedMinutes;
  });
  return qualifyingFeeTier.fee;
};

module.exports = {
  findAll: function(req, res) {
    db.Lot.find()
      .then(lots => {
        res.json(lots);
      })
      .catch(err => res.status(400).json(err));
  },

  create: function(req, res) {
    db.Lotdefault.findOne()
      .then(defaults => {
        const lotDefaults = {
          name: defaults.name,
          capacity: defaults.capacity,
          departureLeeway: defaults.departureLeeway,
          feeFormula: defaults.feeFormula
        };
        db.Lot.create(lotDefaults)
          .then(lot => {
            res.json(lot);
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  },

  update: function(req, res) {
    db.Lot.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(lot => res.json(lot))
      .catch(err => res.status(400).json(err));
  },

  remove: function(req, res) {
    db.Lot.findById({ _id: req.params.id })
      .then(lot => lot.remove())
      .then(lot => res.json(lot))
      .catch(err => res.status(400).json(err));
  },

  getVacancyCount: function(req, res) {
    db.Lot.findById(req.params.lotId, "capacity tenants")
      .then(lot => {
        res.json(lot.capacity - lot.tenants.length);
      })
      .catch(err => res.status(400).json(err));
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
        const tenant = lot.tenants.find(tenant => {
          console.log("tenant.ticket:", tenant.ticket);
          console.log("ticket:", ticket);
          if (tenant.ticket === ticket) {
            tenant.departure = Moment(new Date()).format("YYYY-MM-DD HH:mm");
            console.log("returning tenant:", tenant);
            return tenant;
          }
        });
        if (!tenant) {
          console.log("tenant is not defined");
          throw "invalid ticket";
        }
        const duration = Moment.utc(tenant.departure).diff(
          Moment.utc(tenant.payment),
          "minutes"
        );
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
            .catch(err => res.status(400).json(err));
        } else {
          console.log("tenant cannot leave");
          res.json(false);
        }
      })
      .catch(err => res.status(400).json(err));
  },

  getTenantPaymentInfo: function(req, res) {
    db.Lot.findById(req.params.lotId)
      .then(lot => {
        const tenant = lot.tenants.find(tenant => {
          if (tenant.ticket === req.params.ticket) {
            tenant.payment = Moment(new Date()).format("YYYY-MM-DD HH:mm");
            tenant.fee = calculateFee(tenant, lot.feeFormula);
            return tenant;
          }
        });
        if (!tenant) {
          throw "invalid ticket";
        }
        res.json(tenant);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },

  getNewTenant: function(req, res) {
    db.Lot.findById(req.params.lotId)
      .then(lot => {
        if (lot.capacity - lot.tenants.length > 0) {
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
          ).catch(err => res.status(400).json(err));
        } else {
          res.json(null);
        }
      })
      .catch(err => res.status(400).json(err));
  },
  updateTenant: function(req, res) {
    const tenant = req.body;
    db.Lot.findByIdAndUpdate(req.params.lotId, {
      $pull: {
        tenants: { ticket: tenant.ticket, payment: null }
      }
    }).catch(err => res.status(400).json(err));
    db.Lot.findByIdAndUpdate(req.params.lotId, {
      $push: { tenants: tenant }
    }).catch(err => res.status(400).json(err));
  }
};
