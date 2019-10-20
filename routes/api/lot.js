const router = require("express").Router();
const lotController = require("../../controllers/lotController");

// Matches with "/api/lot"
router
  .route("/")
  .get(lotController.findAll)
  .post(lotController.create);
router
  .route("/:id")
  .put(lotController.update)
  .delete(lotController.remove);
router.route("/tenant/:lotId").get(lotController.getNewTenant);

module.exports = router;
