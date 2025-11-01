const express = require("express");
const {
  loginAuth,
  verifyAuth,
  registerAuth,
  logoutAuth
} = require("../controllers/auth.Controller");
const {loginSchema, registerSchema} = require("../schemas/auth.Schema")
const {validateSchema} = require("../middlewares/validateSchema.Middleware")

const router = express.Router();

router.post("/register",validateSchema(registerSchema), registerAuth);

router.post("/login",validateSchema(loginSchema), loginAuth);

router.get("/verify", verifyAuth);

router.post("/logout", logoutAuth);

module.exports = {
  router,
};
