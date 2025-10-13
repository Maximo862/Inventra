const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const {router} = require("./routes/routes");
const {productsrouter} = require("./routes/productsRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));

app.use(router);
app.use(productsrouter);

app.listen(4000, () => console.log("Server running on port 4000"));



//conectar crud con frontend y depurar 
//crud de suppliers ver el tema de como se trabajan las ordenes y demas tablas
//COMMIT