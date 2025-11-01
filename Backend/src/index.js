const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { router } = require("./routes/routes");
const { productsrouter } = require("./routes/products.Routes");
const { supplierRoutes } = require("./routes/suppliers.Routes");
const { categoriesRoutes } = require("./routes/categories.Routes");
const { orderRouter } = require("./routes/order.Routes");
const { userRoutes } = require("./routes/user.Routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(router);
app.use(productsrouter);
app.use(supplierRoutes);
app.use(categoriesRoutes);
app.use(orderRouter);
app.use(userRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
