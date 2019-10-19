const router = require("express").Router();

const bookRoutes = require("./books");
const lotRoutes = require("./lot");

// Book routes
router.use("/books", bookRoutes);

router.use("/lot", lotRoutes);

module.exports = router;
