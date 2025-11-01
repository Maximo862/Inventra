const {
  getUsersDB,
  findUserByEmail,
  createUser,
  updateUserDB,
  deleteUserDB,
  findUserById,
} = require("../repositories/user.Repository");
const { hashPassword } = require("../utils/hash");

async function getUsersService() {
  const users = await getUsersDB();
  return users.length ? users : [];
}

async function createUserService({ username, email, password, role }) {
  const userExisted = await findUserByEmail(email);
  if (userExisted) throw new Error("User already exists");

  const hashed = await hashPassword(password);
  const userId = await createUser(username, email, hashed, role);
  return { id: userId, username, email, role };
}

async function updateUserService(id, updates) {
  const user = await findUserById(id);
  if (!user) throw new Error("User not found");

  const { username, email, role } = updates;
  const updated = await updateUserDB(id, username, email, role);
  if (!updated) throw new Error("Update failed");

  return { id, username, email, role };
}

async function deleteUserService(id) {
  const user = await findUserById(id);
  if (!user) throw new Error("User not found");

  const deleted = await deleteUserDB(id);
  if (!deleted) throw new Error("Delete failed");

  return { message: "User deleted successfully" };
}

module.exports = {
  getUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
};
