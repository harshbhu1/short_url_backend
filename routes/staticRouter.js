const express = require("express");

const {
  allUrlgenereatedOneByUser,
  handleLogin,
  handleSignUp,
} = require("../controllers/staticRouter");

const router = express.Router();

router.get("/", allUrlgenereatedOneByUser);

router.get("/signup", handleSignUp);
router.get("/login", handleLogin);

module.exports = router;
