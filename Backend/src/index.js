const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { authRouter } = require("./routes/auth.routes");
const { productsRouter } = require("./routes/products.Routes");
const { supplierRoutes } = require("./routes/suppliers.Routes");
const { categoriesRoutes } = require("./routes/categories.Routes");
const { orderRouter } = require("./routes/order.Routes");
const { userRoutes } = require("./routes/user.Routes");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(authRouter);
app.use(productsRouter);
app.use(userRoutes);
app.use(orderRouter);
app.use(categoriesRoutes);
app.use(supplierRoutes);
app.use(errorHandler);

app.listen(4000, () => console.log("Server running on port 4000"));
