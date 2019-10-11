const router = require("express").Router();
const bookRoutes = require("./books");
const lotRoutes = require("./lots");

// Book routes
router.use("/books", bookRoutes);

router.use("/lots", lotRoutes);

module.exports = router;
