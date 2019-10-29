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
router.route("/api/lot/getNewTenant/:lotId").get(lotController.getNewTenant);
router.route("/api/lot/payTicket/:lotId").put(lotController.payTicket);
router
  .route("/api/lot/getVacancyCount/:lotId")
  .get(lotController.getVacancyCount);
router
  .route("/api/lot/ticket/getTenantPaymentInfo/:lotId/:ticket")
  .get(lotController.getTenantPaymentInfo);
router
  .route("/api/lot/ticket/paymentConfirmation/:lotId/:ticket")
  .get(lotController.getPaymentConfirmation);

module.exports = router;
