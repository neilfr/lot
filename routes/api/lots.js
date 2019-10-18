const router = require("express").Router();
const lotsController = require("../../controllers/lotsController");

// Matches with "/api/lots"
router
  .route("/")
  .get(lotsController.findAll)
  .put(lotsController.update);
// .post(lotsController.create)

module.exports = router;
