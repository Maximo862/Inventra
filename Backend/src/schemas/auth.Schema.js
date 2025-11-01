const z = require("zod");

const registerSchema = z.object({
  username: z.string({ required_error: "string is required" }),
  email: z
    .string({ required_error: "string is required" })
    .email({ required_error: "email is required" }),
  password: z
    .string({ required_error: "string is required" })
    .min(8, { required_error: "min 8 caracters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "string is required" })
    .email({ required_error: "email is required" }),
  password: z
    .string({ required_error: "string is required" })
    .min(8, { required_error: "min 8 caracters" }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
