const express = require("express");
const {
  loginAuth,
  verifyAuth,
  registerAuth,
} = require("../controllers/auth.Controller");

const router = express.Router();

router.post("/register", registerAuth);

router.post("/login", loginAuth);

router.get("/verify", verifyAuth);

module.exports = {
  router,
};
