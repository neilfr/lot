const router = require("express").Router();

const lotController = require("../controllers/lotController");

router
  .route("/api/lot/")
  .get(lotController.findAll)
  .post(lotController.create);
router
  .route("/api/lot/:id")
  .put(lotController.update)
  .delete(lotController.remove);
router
  .route("/api/lot/tenant/:lotId")
  .get(lotController.getNewTenant)
  .put(lotController.updateTenant);
router.route("/api/lot/vacancies/:lotId").get(lotController.getVacancyCount);
router
  .route("/api/lot/ticket/payment/:lotId/:ticket")
  .get(lotController.getTenantPaymentInfo);
router
  .route("/api/lot/ticket/paymentConfirmation/:lotId/:ticket")
  .get(lotController.getPaymentConfirmation);

module.exports = router;
