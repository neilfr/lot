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
router
  .route("/tenant/:lotId")
  .get(lotController.getNewTenant)
  .put(lotController.updateTenant);

router.route("/vacancies/:lotId").get(lotController.getVacancyCount);
router
  .route("/ticket/payment/:lotId/:ticket")
  .get(lotController.getTenantPaymentInfo);
router
  .route("/ticket/departure/:lotId/:ticket")
  .post(lotController.postTenantDepatureInfo);

module.exports = router;
