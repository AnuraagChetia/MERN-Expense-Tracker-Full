const express = require("express");
const router = express.Router();

const leaderboardController = require("../controller/leaderboard");

const userAuthentication = require("../middleware/auth");

router.get(
  "/get-leaderboard",
  userAuthentication,
  leaderboardController.getLeaderboard
);

module.exports = router;
