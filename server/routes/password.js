const express = require("express");
const router = express.Router();

const passwordController = require("../controller/password");

router.post("/update-password/:id", passwordController.updatePassword);

router.get("/forget-password/:id", passwordController.resetPassword);

router.post("/forgetpassword", passwordController.forgetPassword);

module.exports = router;
