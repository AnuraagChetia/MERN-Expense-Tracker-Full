const express = require("express");
const router = express.Router();

const orderController = require("../controller/order");
const authenticate = require("../middleware/auth");

router.get("/buy-premium", authenticate, orderController.getOrder);
router.post("/success-premium", authenticate, orderController.success);
router.post("/failed-premium", authenticate, orderController.failed);
module.exports = router;
