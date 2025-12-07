const {
  getUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
} = require("../services/user.Service");

async function getAllUsers(req, res, next) {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function createUserController(req, res, next) {
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
    next(error);
  }
}

async function updateUserController(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await updateUserService(id, updates);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function deleteUserController(req, res, next) {
  try {
    const { id } = req.params;
    const result = await deleteUserService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  createUserController,
  updateUserController,
  deleteUserController,
};
