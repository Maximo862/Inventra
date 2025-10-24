const {
  findUserByEmail,
  findUserById,
  createUser,
} = require("../repositories/auth.Repository");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken, verifyToken } = require("../utils/jwt");

async function registerUser({ username, email, password }) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashed = await hashPassword(password);
  const userId = await createUser(username, email, hashed);
  const token = generateToken({ id: userId });

  return { id: userId, username, email, token };
}

async function loginUser({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Incorrect password");

  const token = generateToken({ id: user.id });
  return { id: user.id, username: user.username, email, token };
}

async function verifyUser(token) {
  const decoded = verifyToken(token);
  const user = await findUserById(decoded.id);
  if (!user) throw new Error("User not found");
  return user;
}

module.exports = { registerUser, loginUser, verifyUser };
