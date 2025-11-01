const {
  getUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
} = require("../services/user.Service");

async function getAllUsers(req, res) {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error("getAllUsers:", error.message);
    res.status(500).json({ error: error.message });
  }
}

async function createUserController(req, res) {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await createUserService({
      username,
      email,
      password,
      role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("createUser:", err.message);
    const status = error.message === "User already exists" ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
}

async function updateUserController(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await updateUserService(id, updates);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("updateUser:", error.message);
    const status = error.message === "User not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

async function deleteUserController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteUserService(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("deleteUser:", error.message);
    const status = error.message === "User not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers,
  createUserController,
  updateUserController,
  deleteUserController,
};
