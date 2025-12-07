const express = require("express");
const {
  loginAuth,
  verifyAuth,
  registerAuth,
  logoutAuth
} = require("../controllers/auth.Controller");
const {loginSchema, registerSchema} = require("../schemas/auth.Schema")
const {validateSchema} = require("../middlewares/validateSchema.Middleware")

const authRouter = express.Router();

authRouter.post("/register",validateSchema(registerSchema), registerAuth);

authRouter.post("/login",validateSchema(loginSchema), loginAuth);

authRouter.get("/verify", verifyAuth);

authRouter.post("/logout", logoutAuth);

module.exports = {
  authRouter,
};
