const { Router } = require("express");
const {
  createUserController,
  deleteUserController,
  getAllUsers,
  updateUserController
} = require("../controllers/user.Controller.js");
const { authRequired } = require("../middlewares/auth.Middleware");
const { requireRole } = require("../middlewares/requireRolre.Middleware.js");

const userRoutes = Router();

userRoutes.get("/user", getAllUsers);
userRoutes.post("/user",authRequired,requireRole("admin"), createUserController);
userRoutes.put("/user/:id",authRequired,requireRole("admin"), updateUserController);
userRoutes.delete("/user/:id",authRequired,requireRole("admin"), deleteUserController);

module.exports = {
  userRoutes,
};
